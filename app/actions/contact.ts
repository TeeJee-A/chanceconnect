"use server";

import { headers } from "next/headers";
import { SITE } from "@/lib/site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = process.env.CONTACT_EMAIL ?? SITE.email;
// The sender domain must be verified in Resend before mail is delivered.
const FROM_EMAIL = "ChanceConnect Website <noreply@chanceconnect.de>";

/** Who is writing — drives the subject tag and which extra field is relevant. */
export type ContactRole = "applicant" | "employer" | "other";

const ROLE_TAG: Record<ContactRole, string> = {
  applicant: "[Bewerber]",
  employer: "[Arbeitgeber]",
  other: "[Sonstiges]",
};
const ROLE_LABEL: Record<ContactRole, string> = {
  applicant: "Bewerber",
  employer: "Arbeitgeber",
  other: "Sonstiges",
};

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error" };

/** Naive in-memory rate limit: max 3 submissions per IP per 10 minutes. */
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  submissions.set(ip, recent);
  // Opportunistic cleanup so the map never grows unbounded.
  if (submissions.size > 500) {
    for (const [key, times] of submissions) {
      if (times.every((t) => now - t >= WINDOW_MS)) submissions.delete(key);
    }
  }
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real users never see or fill this field.
  if (formData.get("company")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const source = String(formData.get("source") ?? "kontakt").trim();

  const rawRole = String(formData.get("role") ?? "other");
  const role: ContactRole = rawRole in ROLE_TAG ? (rawRole as ContactRole) : "other";

  // Role-specific extra field — all optional. NOTE: the employer field is
  // "companyName", never "company", which is the honeypot above.
  const domain = String(formData.get("domain") ?? "").trim(); // applicant
  const companyName = String(formData.get("companyName") ?? "").trim(); // employer
  const subject = String(formData.get("subject") ?? "").trim(); // other

  if (
    !name ||
    !message ||
    !EMAIL_RE.test(email) ||
    name.length > 200 ||
    email.length > 200 ||
    domain.length > 200 ||
    companyName.length > 200 ||
    subject.length > 300 ||
    message.length > 5000
  ) {
    return { status: "error" };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) return { status: "error" };

  const detail =
    role === "employer" ? companyName : role === "applicant" ? domain : subject;
  const mailSubject = `${ROLE_TAG[role]} ${detail || "Neue Nachricht"} – ${name}`;

  const body = [
    `Rolle:   ${ROLE_LABEL[role]}`,
    `Name:    ${name}`,
    `E-Mail:  ${email}`,
    role === "applicant" && domain ? `Bereich: ${domain}` : null,
    role === "employer" && companyName ? `Firma:   ${companyName}` : null,
    role === "other" && subject ? `Betreff: ${subject}` : null,
    `Quelle:  ${source}`,
    "",
    message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: [email],
        subject: mailSubject,
        text: body,
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { status: "error" };
  }
}
