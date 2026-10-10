import { Resend } from "resend";

export type EnquiryPayload = {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  projectType: string;
  projectLocation?: string;
  message?: string;
  file?: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
};

export async function sendEnquiryEmail(payload: EnquiryPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Mythri Infra Website <onboarding@resend.dev>";
  const cc = process.env.CONTACT_CC_EMAIL;

  const text = [
    `New enquiry from mythri-infra website`,
    ``,
    `Name: ${payload.name}`,
    `Company: ${payload.company || "—"}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "—"}`,
    `Project type: ${payload.projectType}`,
    `Project location: ${payload.projectLocation || "—"}`,
    ``,
    `Message:`,
    payload.message || "—",
  ].join("\n");

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email is not configured");
    }
    console.info("[contact] Email not configured — logging enquiry locally");
    console.info(text);
    if (payload.file) {
      console.info(
        `[contact] Attachment: ${payload.file.filename} (${payload.file.content.length} bytes)`,
      );
    }
    return { id: "dev-log" };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: [to],
    ...(cc ? { cc: [cc] } : {}),
    subject: `Website enquiry: ${payload.projectType} — ${payload.name}`,
    text,
    attachments: payload.file
      ? [
          {
            filename: payload.file.filename,
            content: payload.file.content,
            contentType: payload.file.contentType,
          },
        ]
      : undefined,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}
