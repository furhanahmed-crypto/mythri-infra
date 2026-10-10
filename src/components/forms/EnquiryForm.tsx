"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, FileUp, Loader2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactContent } from "@/content/contact";
import { trackEvent } from "@/lib/analytics";
import { fluidSpring } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "phone" | "projectType" | "email" | "boq", string>>;

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXT = [".pdf", ".xls", ".xlsx"];

const fieldClass = "h-11 rounded-lg px-3 text-base md:text-sm";

export function EnquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [projectType, setProjectType] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    if (!String(data.get("name") || "").trim()) next.name = "Please enter your name.";
    if (!String(data.get("phone") || "").trim()) next.phone = "Please enter a phone number.";
    if (!projectType) next.projectType = "Please select a project type.";
    const email = String(data.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address.";
    }
    const file = data.get("boq");
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) next.boq = "Attachment must be 10 MB or smaller.";
      else if (!ALLOWED_EXT.some((ext) => file.name.toLowerCase().endsWith(ext))) {
        next.boq = "Only PDF or Excel files are allowed.";
      }
    }
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"], #${first}`)?.focus();
      return;
    }

    setState("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      trackEvent("generate_lead", { method: "contact_form" });
      setState("success");
      form.reset();
      setProjectType("");
      setFileName(null);
    } catch (err) {
      setState("error");
      setServerError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8 }}
          transition={fluidSpring}
          role="status"
          className="flex flex-col items-center gap-4 py-10 text-center"
        >
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.1 }}
            className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </motion.span>
          <p className="max-w-sm text-lg font-semibold">{contactContent.form.success}</p>
          <Button variant="outline" size="lg" onClick={() => setState("idle")}>
            Send another enquiry
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          className="grid gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {/* Honeypot — must stay empty */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Name" required error={errors.name}>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="company" label="Company">
              <Input id="company" name="company" autoComplete="organization" className={fieldClass} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="phone" label="Phone" required error={errors.phone}>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="projectType" label="Project type" required error={errors.projectType}>
              <input type="hidden" name="projectType" value={projectType} />
              <Select
                value={projectType}
                onValueChange={(v) => {
                  setProjectType(v);
                  setErrors((e) => ({ ...e, projectType: undefined }));
                }}
              >
                <SelectTrigger
                  id="projectType"
                  aria-invalid={!!errors.projectType}
                  aria-describedby={errors.projectType ? "projectType-error" : undefined}
                  className={cn(fieldClass, "w-full data-[size=default]:h-11")}
                >
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {contactContent.form.projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field id="projectLocation" label="Project location">
              <Input id="projectLocation" name="projectLocation" className={fieldClass} />
            </Field>
          </div>

          <Field id="message" label="Message">
            <Textarea
              id="message"
              name="message"
              rows={5}
              className="min-h-32 rounded-lg px-3 py-2.5 text-base md:text-sm"
            />
          </Field>

          <Field id="boq" label="Attach BOQ (optional)" error={errors.boq}>
            <label
              htmlFor="boq"
              className={cn(
                "group/file flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-input p-4 transition-colors hover:border-primary hover:bg-accent/50 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                errors.boq && "border-destructive",
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover/file:bg-primary group-hover/file:text-primary-foreground">
                <FileUp className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {fileName ?? "Choose a file"}
                </span>
                <span className="block text-xs text-muted-foreground">PDF or Excel, max 10 MB</span>
              </span>
              {fileName ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove attachment"
                  onClick={(e) => {
                    e.preventDefault();
                    if (fileRef.current) fileRef.current.value = "";
                    setFileName(null);
                    setErrors((er) => ({ ...er, boq: undefined }));
                  }}
                >
                  <X aria-hidden="true" />
                </Button>
              ) : null}
              <input
                ref={fileRef}
                id="boq"
                name="boq"
                type="file"
                className="sr-only"
                aria-describedby={errors.boq ? "boq-error" : undefined}
                accept=".pdf,.xls,.xlsx,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </Field>

          <AnimatePresence>
            {serverError ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Alert variant="destructive">
                  <AlertCircle aria-hidden="true" />
                  <AlertTitle>Could not send</AlertTitle>
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Button type="submit" size="xl" disabled={state === "submitting"} className="w-full sm:w-auto sm:justify-self-start">
            {state === "submitting" ? (
              <>
                <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send data-icon="inline-start" aria-hidden="true" />
                Send Enquiry
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only">(required)</span> : null}
      </Label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-destructive"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
