"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { contactContent } from "@/content/contact";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type FormState = "idle" | "submitting" | "success" | "error";

export function EnquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      trackEvent("generate_lead", { method: "contact_form" });
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-[5px] border border-border bg-surface p-6"
        role="status"
      >
        <p className="font-medium text-text">{contactContent.form.success}</p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-text underline decoration-accent underline-offset-4"
          onClick={() => setState("idle")}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot — leave empty */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Name" htmlFor="name" required>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      <Field label="Company" htmlFor="company">
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Project type" htmlFor="projectType" required>
        <select
          id="projectType"
          name="projectType"
          required
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select a type
          </option>
          {contactContent.form.projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Project location" htmlFor="projectLocation">
        <input
          id="projectLocation"
          name="projectLocation"
          type="text"
          className={inputClass}
        />
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      <Field
        label="Attach BOQ (optional)"
        htmlFor="boq"
        hint="PDF or Excel, max 10 MB"
      >
        <input
          id="boq"
          name="boq"
          type="file"
          accept=".pdf,.xls,.xlsx,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="block w-full text-sm text-text-muted file:mr-4 file:rounded-[5px] file:border-0 file:bg-surface file:px-4 file:py-2 file:text-sm file:font-semibold file:text-text"
        />
      </Field>

      {error ? (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}

const inputClass =
  "min-h-11 w-full rounded-[5px] border border-border bg-bg px-3 py-2 text-text outline-none transition focus:border-accent";

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="text-xs text-text-muted">{hint}</p> : null}
    </div>
  );
}
