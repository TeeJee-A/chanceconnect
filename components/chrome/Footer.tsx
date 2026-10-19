import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, Languages } from "lucide-react";
import { Whatsapp } from "@/components/icons/social";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const EXPLORE = [
  { key: "services", href: "/leistungen" },
  { key: "applicants", href: "/fuer-bewerber" },
  { key: "employers", href: "/fuer-arbeitgeber" },
  { key: "jobs", href: "/stellenangebote" },
  { key: "about", href: "/ueber-uns" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/kontakt" },
] as const;

const LEGAL = [
  { key: "privacy", href: "/datenschutz" },
  { key: "imprint", href: "/impressum" },
  { key: "terms", href: "/agb" },
] as const;

const heading = "text-xs font-bold uppercase tracking-[0.16em] text-teal";
const link = "text-sm text-muted transition hover:text-deep";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tm = useTranslations("contact.methods");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-mint-soft">
      <div className="container-site py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_0.8fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo className="h-12 sm:h-14" />
            <p className="mt-6 text-base font-semibold text-deep">{t("tagline")}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t("blurb")}</p>
          </div>

          {/* Explore */}
          <nav aria-label={t("columns.explore")}>
            <h3 className={heading}>{t("columns.explore")}</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
              {EXPLORE.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className={link}>
                    {tn(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label={t("columns.legal")}>
            <h3 className={heading}>{t("columns.legal")}</h3>
            <ul className="mt-5 space-y-3">
              {LEGAL.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className={link}>
                    {t(`legal.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className={heading}>{t("columns.contact")}</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={SITE.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal shadow-card transition group-hover:bg-deep group-hover:text-white">
                    <Whatsapp className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-semibold text-deep" dir="ltr">
                    {SITE.whatsapp.display}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="group flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal shadow-card transition group-hover:bg-deep group-hover:text-white">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-semibold text-deep">{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal shadow-card">
                  <Languages className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm text-muted">{tm("languagesDesc")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8 text-center text-xs text-muted sm:text-start">
          <p>
            © {year} {SITE.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
