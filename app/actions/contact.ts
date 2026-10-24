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

/** Why a submission failed — picks the message the visitor sees. */
export type ContactErrorReason = "invalid" | "rateLimited" | "failed";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; reason: ContactErrorReason };

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

/**
 * Visitor IP as reported by the proxy in front of the app (Hostinger's CDN).
 * `from` names the header it came from, so the logs show which one is set.
 */
function clientIp(h: { get(name: string): string | null }): { ip: string; from: string } {
  for (const name of ["cf-connecting-ip", "true-client-ip", "x-real-ip", "x-forwarded-for"]) {
    const ip = h.get(name)?.split(",")[0].trim();
    if (ip) return { ip, from: name };
  }
  return { ip: "", from: "none" };
}

/** IP with the host part hidden, for logs: 203.0.113.x / 2001:db8:85a3::x */
function maskIp(ip: string): string {
  if (ip.includes(":")) return ip.split(":").slice(0, 3).join(":") + "::x";
  return ip.split(".").slice(0, 3).join(".") + ".x";
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

  // Field names only — never log what the visitor typed.
  const invalid = [
    (!name || name.length > 200) && "name",
    (!EMAIL_RE.test(email) || email.length > 200) && "email",
    (!message || message.length > 5000) && "message",
    domain.length > 200 && "domain",
    companyName.length > 200 && "companyName",
    subject.length > 300 && "subject",
  ].filter(Boolean);
  if (invalid.length > 0) {
    console.warn(`Contact form rejected (${source}): invalid ${invalid.join(", ")}`);
    return { status: "error", reason: "invalid" };
  }

  const { ip, from } = clientIp(await headers());
  const visitor = ip ? `${maskIp(ip)} via ${from}` : "unknown IP";
  // Without an IP every visitor would share one bucket, so skip the limit then.
  if (!ip) {
    console.warn(`Contact form (${source}): no visitor IP header, rate limit skipped`);
  } else if (isRateLimited(ip)) {
    console.warn(`Contact form rejected (${source}): rate limited, ${visitor}`);
    return { status: "error", reason: "rateLimited" };
  }

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
      return { status: "error", reason: "failed" };
    }
    console.log(`Contact form sent (${source}), ${visitor}`);
    return { status: "success" };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { status: "error", reason: "failed" };
  }
}
