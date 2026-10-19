import { locales } from "@/i18n/routing";

/**
 * Build the `alternates.languages` hreflang map for a given path (no locale
 * prefix), e.g. localeAlternates("/fuer-bewerber").
 */
export function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/de${path}`;
  return languages;
}
