import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * The middleware redirects "/" to the negotiated locale before this renders;
 * this page is a static fallback that forwards to the default locale.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
