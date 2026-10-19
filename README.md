# ChanceConnect

Website für **ChanceConnect** – Ausbildungs- und Fachkräftevermittlung zwischen
Marokko und Deutschland. Gebaut mit **Next.js 16** (App Router, TypeScript),
**Tailwind CSS 4** und **next-intl**.

## Features

- Viersprachig: Deutsch (Standard), Englisch, Französisch, Arabisch (RTL)
- Seiten: Start, Leistungen, Für Bewerber, Für Arbeitgeber, Stellenangebote,
  Über uns, FAQ, Kontakt, Impressum, Datenschutz, AGB
- Kontaktformular per Server Action + [Resend](https://resend.com)
- Markenfarben „Modern & Trustworthy“: Deep Teal `#124E52`, Teal `#1D7874`,
  Mint `#72C6B1`, Soft Mint `#E9F6F1`, Off White `#FAFBF8`

## Entwicklung

```bash
npm install
npm run dev
```

Die Seite läuft dann unter [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Umgebungsvariablen

| Variable         | Zweck                                                  |
| ---------------- | ------------------------------------------------------ |
| `RESEND_API_KEY` | API-Key für den Versand des Kontaktformulars           |
| `CONTACT_EMAIL`  | Optional – Empfänger (Standard: `SITE.email`)          |

Die Absender-Domain (`noreply@chanceconnect.de`) muss in Resend verifiziert sein.

## Anpassen

- **Texte:** alle Inhalte liegen in [`messages/`](messages) (`de.json`, `en.json`,
  `fr.json`, `ar.json`) – Komponenten enthalten keine festen Texte.
- **Kontaktdaten (E-Mail, WhatsApp, Domain):** [`lib/site.ts`](lib/site.ts).
- **Farben, Schrift, Schatten:** `@theme` in [`app/globals.css`](app/globals.css).
- **Logo / Favicon:** `public/logo.png`, `public/logo-mark.png`,
  `app/icon.png`, `app/apple-icon.png`.
