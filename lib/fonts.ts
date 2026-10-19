import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

/**
 * House type system — one friendly geometric sans for headings and body.
 * Plus Jakarta → open, approachable letterforms that match the rounded logo.
 * Plex Arabic  → Arabic face, activated for the `ar` (RTL) locale.
 * CSS custom properties are consumed as Tailwind theme tokens in globals.css.
 */

export const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--ff-sans",
  display: "swap",
});

export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-arabic",
  display: "swap",
});
