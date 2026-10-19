import { useTranslations } from "next-intl";
import { Whatsapp } from "@/components/icons/social";
import { SITE } from "@/lib/site";

/** Floating WhatsApp shortcut — the fastest way in for most applicants. */
export function WhatsAppButton() {
  const t = useTranslations("contact.methods");

  return (
    <a
      href={SITE.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("whatsapp")} – ${t("whatsappDesc")}`}
      className="group fixed bottom-5 end-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-deep ps-4 pe-4 text-white shadow-lift transition-all duration-300 hover:bg-deep-dark sm:bottom-6 sm:end-6 sm:pe-5"
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center">
        <span aria-hidden className="absolute inset-0 animate-ping-soft rounded-full bg-mint/60" />
        <Whatsapp className="relative h-6 w-6" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">{t("whatsapp")}</span>
    </a>
  );
}
