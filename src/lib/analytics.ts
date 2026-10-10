export type AnalyticsEvent =
  | "click_to_call"
  | "whatsapp_click"
  | "generate_lead";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string,
      params?: Record<string, string | number | boolean>,
    ) => void;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  // Never send PII (phone/email) — SECURITY.md
  window.gtag?.("event", event, params);
}
