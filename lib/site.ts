/**
 * Brand + contact details in one place. Components read from here, so a
 * change (new number, new mailbox, social accounts) is a one-line edit.
 *
 * Domain confirmed: chanceconnect.de.
 * TODO before launch: confirm the mailbox and the WhatsApp number (carried
 * over from TalentZukunft).
 */
export const SITE = {
  name: "ChanceConnect",
  url: "https://chanceconnect.de",
  email: "info@chanceconnect.de",
  whatsapp: {
    display: "+49 152 33570163",
    href: "https://wa.me/4915233570163",
  },
} as const;
