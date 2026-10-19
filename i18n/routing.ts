import { defineRouting } from "next-intl/routing";

export const locales = ["de", "en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

/** Right-to-left locales get `dir="rtl"` + the Arabic type face. */
export const rtlLocales: readonly Locale[] = ["ar"];

export const localeLabels: Record<Locale, { native: string; short: string }> = {
  de: { native: "Deutsch", short: "DE" },
  en: { native: "English", short: "EN" },
  fr: { native: "Français", short: "FR" },
  ar: { native: "العربية", short: "AR" },
};

export const routing = defineRouting({
  locales,
  defaultLocale: "de",
  localePrefix: "always",
});
