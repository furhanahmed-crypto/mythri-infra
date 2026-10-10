import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);
const ALLOWED_EXTENSIONS = [".pdf", ".xls", ".xlsx"];

const projectTypes = new Set([
  "Earthwork",
  "Roads",
  "Drainage",
  "Sand Supply",
  "Mining Support",
  "Other",
]);

// Simple in-memory rate limit (per instance)
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_HITS) return false;
  entry.count += 1;
  return true;
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

function hasAllowedExtension(filename: string) {
  const lower = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

async function verifyRecaptcha(token: string | null) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // optional until keys are provided
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await response.json()) as { success?: boolean; score?: number };
  return Boolean(data.success) && (data.score ?? 0) >= 0.5;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form submission." },
      { status: 400 },
    );
  }

  const honeypot = String(formData.get("website") || "").trim();
  if (honeypot) {
    // Pretend success to bots
    return NextResponse.json({ ok: true });
  }

  const captchaToken = String(formData.get("recaptchaToken") || "") || null;
  const captchaOk = await verifyRecaptcha(captchaToken);
  if (!captchaOk) {
    return NextResponse.json(
      { ok: false, error: "Spam check failed. Please try again." },
      { status: 400 },
    );
  }

  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const projectType = String(formData.get("projectType") || "").trim();
  const projectLocation = String(formData.get("projectLocation") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const file = formData.get("boq");

  if (!name || name.length > 120) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid name." },
      { status: 400 },
    );
  }
  if (!phone || phone.length > 40) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }
  if (!projectTypes.has(projectType)) {
    return NextResponse.json(
      { ok: false, error: "Please select a project type." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  let attachment:
    | { filename: string; content: Buffer; contentType: string }
    | undefined;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Attachment must be 10 MB or smaller." },
        { status: 400 },
      );
    }
    if (!ALLOWED_TYPES.has(file.type) || !hasAllowedExtension(file.name)) {
      return NextResponse.json(
        { ok: false, error: "Only PDF or Excel attachments are allowed." },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachment = {
      filename: sanitizeFilename(file.name),
      content: buffer,
      contentType: file.type,
    };
  }

  try {
    await sendEnquiryEmail({
      name,
      company: company || undefined,
      phone,
      email: email || undefined,
      projectType,
      projectLocation: projectLocation || undefined,
      message: message || undefined,
      file: attachment,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send your enquiry. Please call us instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
