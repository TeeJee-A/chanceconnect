"use client";

import { useActionState, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendContactMessage, type ContactRole, type ContactState } from "@/app/actions/contact";

const ROLES: { value: ContactRole; key: "roleApplicant" | "roleEmployer" | "roleOther" }[] = [
  { value: "applicant", key: "roleApplicant" },
  { value: "employer", key: "roleEmployer" },
  { value: "other", key: "roleOther" },
];

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink placeholder-muted/60 outline-none transition focus:border-teal focus:ring-4 focus:ring-mint/25";
const label = "mb-1.5 block text-sm font-semibold text-deep";

/**
 * Contact form with visible labels and a segmented "I am…" picker. Submits via
 * server action + Resend. `source` tags where the message came from;
 * `defaultRole` preselects the role (e.g. "employer" on the employer page).
 */
export function ContactForm({
  source,
  defaultRole = "applicant",
}: {
  source: string;
  defaultRole?: ContactRole;
}) {
  const t = useTranslations("contact.form");
  const id = useId();
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContactMessage, {
    status: "idle",
  });
  const [role, setRole] = useState<ContactRole>(defaultRole);

  const extra =
    role === "applicant"
      ? { name: "domain", label: t("domain") }
      : role === "employer"
        ? { name: "companyName", label: t("companyName") }
        : { name: "subject", label: t("subject") };

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="source" value={source} />
      {/* Honeypot — hidden from real users, bots fill it and get silently dropped. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <fieldset>
        <legend className={label}>{t("role")}</legend>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-mint-soft p-1">
          {ROLES.map((r) => (
            <label key={r.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="role"
                value={r.value}
                checked={role === r.value}
                onChange={() => setRole(r.value)}
                className="peer sr-only"
              />
              <span className="block rounded-lg px-2 py-2.5 text-center text-sm font-semibold text-muted transition peer-checked:bg-white peer-checked:text-deep peer-checked:shadow-card peer-focus-visible:ring-4 peer-focus-visible:ring-mint/40">
                {t(r.key)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            {t("name")}
          </label>
          <input id={`${id}-name`} required name="name" autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            {t("email")}
          </label>
          <input
            id={`${id}-email`}
            required
            type="email"
            name="email"
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-extra`} className={label}>
          {extra.label}
        </label>
        <input key={extra.name} id={`${id}-extra`} name={extra.name} className={field} />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          {t("message")}
        </label>
        <textarea id={`${id}-message`} required name="message" rows={5} className={cn(field, "resize-none")} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-deep px-6 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-deep-dark hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/50 disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? t("sending") : t("send")}
        <Send className="h-4 w-4 rtl:-scale-x-100" />
      </button>

      <div aria-live="polite">
        {state.status === "success" && (
          <p className="flex items-start gap-2 rounded-xl border border-mint bg-mint-soft px-4 py-3 text-sm font-medium text-deep">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            {t("success")}
          </p>
        )}
        {state.status === "error" && (
          <p className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {t("error")}
          </p>
        )}
      </div>

      <p className="text-xs text-muted">{t("note")}</p>
    </form>
  );
}
