import type { ReactNode } from "react";

/**
 * Next.js requires a root layout. The real <html> / <body> — including the
 * locale-dependent `lang` and `dir` attributes, fonts and providers — live in
 * app/[locale]/layout.tsx so they can depend on the active locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
