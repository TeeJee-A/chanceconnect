import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { Mail, Languages, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Whatsapp } from "@/components/icons/social";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ContactRole } from "@/app/actions/contact";
import { ContactForm } from "./ContactForm";

function Method({
  href,
  Icon,
  title,
  desc,
}: {
  href?: string;
  Icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  const body = (
    <>
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-teal shadow-card transition group-hover:bg-deep group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-deep">{title}</span>
        <span className="block truncate text-sm text-muted">{desc}</span>
      </span>
      {href && (
        <ArrowRight className="h-4 w-4 shrink-0 text-teal transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      )}
    </>
  );
  const cls = "group flex items-center gap-4 rounded-2xl p-2 transition";

  if (!href) return <div className={cls}>{body}</div>;
  return (
    <a
      href={href}
      className={cn(cls, "hover:bg-white/60")}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}

/**
 * Contact block — reachable methods beside the form, inside a soft mint panel.
 * `variant="page"` is the /kontakt layout (the page hero already carries the
 * headline); `"section"` adds its own headline for landing pages.
 */
export function ContactFormSection({
  source = "home",
  defaultRole = "applicant",
  variant = "section",
}: {
  source?: string;
  defaultRole?: ContactRole;
  variant?: "section" | "page";
}) {
  const t = useTranslations("contact");

  return (
    <section id="contact-form" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="container-site">
        <Reveal className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-mint-soft lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative p-7 sm:p-10 lg:p-12">
            <span aria-hidden className="mb-5 block h-1.5 w-10 rounded-full bg-mint" />
            <h2 className="text-display leading-[1.12] font-bold tracking-tight text-deep">
              {variant === "page" ? t("methods.title") : t("form.title")}
            </h2>
            {variant === "section" && (
              <p className="mt-4 text-lg leading-relaxed text-muted">{t("form.subtitle")}</p>
            )}

            <div className="mt-8 space-y-2">
              <Method
                href={SITE.whatsapp.href}
                Icon={Whatsapp}
                title={t("methods.whatsapp")}
                desc={t("methods.whatsappDesc")}
              />
              <Method href={`mailto:${SITE.email}`} Icon={Mail} title={t("methods.email")} desc={SITE.email} />
              <Method Icon={Languages} title={t("methods.languages")} desc={t("methods.languagesDesc")} />
            </div>
          </div>

          <div className="m-2 rounded-[1.6rem] bg-white p-6 shadow-card sm:m-3 sm:p-10">
            {variant === "page" && (
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-deep">{t("form.title")}</h2>
                <p className="mt-1.5 text-muted">{t("form.subtitle")}</p>
              </div>
            )}
            <ContactForm source={source} defaultRole={defaultRole} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
