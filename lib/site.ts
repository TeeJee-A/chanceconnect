/**
 * Brand + contact details in one place. Components read from here, so a
 * change (new number, new mailbox, social accounts) is a one-line edit.
 *
 * Domain confirmed: chanceconnect.de.
 * TODO before launch: confirm the mailbox.
 */
const CONTACTS = [
  {
    name: "Noureddine El Harda",
    display: "+49 156 30169990",
    tel: "tel:+4915630169990",
    whatsapp: "https://wa.me/4915630169990",
  },
  {
    name: "Anouar Taib",
    display: "+49 152 33570163",
    tel: "tel:+4915233570163",
    whatsapp: "https://wa.me/4915233570163",
  },
] as const;

export type Contact = (typeof CONTACTS)[number];

export const SITE = {
  name: "ChanceConnect",
  url: "https://chanceconnect.de",
  email: "info@chanceconnect.de",
  contacts: CONTACTS,
  /** Single-button spots (floating button, menu, FAQ, final CTA) open the first contact. */
  whatsapp: {
    display: CONTACTS[0].display,
    href: CONTACTS[0].whatsapp,
  },
} as const;
