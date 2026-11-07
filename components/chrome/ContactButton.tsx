import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";

/** Floating shortcut to the contact page. */
export function ContactButton() {
  const t = useTranslations("common");

  return (
    <Link
      href="/kontakt"
      aria-label={t("getInTouch")}
      className="group fixed bottom-5 end-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-deep ps-4 pe-4 text-white shadow-lift transition-all duration-300 hover:bg-deep-dark sm:bottom-6 sm:end-6 sm:pe-5"
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center">
        <span aria-hidden className="absolute inset-0 animate-ping-soft rounded-full bg-mint/60" />
        <Mail className="relative h-6 w-6" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">{t("getInTouch")}</span>
    </Link>
  );
}
