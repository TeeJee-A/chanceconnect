import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Whatsapp } from "@/components/icons/social";
import { SITE } from "@/lib/site";
import { Mail, ArrowRight } from "lucide-react";

/** "Gemeinsam Perspektiven schaffen." — closing call to action on a deep teal panel. */
export function FinalCTA() {
  const t = useTranslations("home.cta");

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-site">
        <Reveal className="relative isolate grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] bg-deep px-7 py-14 sm:px-12 lg:grid-cols-[1.3fr_0.7fr] lg:px-16 lg:py-16">
          <div aria-hidden className="dots absolute inset-0 -z-10 text-white/[0.06]" />
          <div aria-hidden className="absolute -end-24 -top-24 -z-10 h-80 w-80 rounded-full bg-mint/20 blur-3xl" />
          <div aria-hidden className="absolute -start-20 -bottom-28 -z-10 h-72 w-72 rounded-full bg-teal/50 blur-3xl" />

          <div>
            <h2 className="text-display leading-[1.1] font-extrabold tracking-tight text-balance text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">{t("subtitle")}</p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
              <Link href="/fuer-bewerber" className="group inline-flex items-center gap-1.5 text-mint transition hover:text-white">
                {t("applicant")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>
              <Link href="/fuer-arbeitgeber" className="group inline-flex items-center gap-1.5 text-mint transition hover:text-white">
                {t("employer")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button href={SITE.whatsapp.href} variant="light" size="lg" className="w-full">
              <Whatsapp className="h-5 w-5 text-teal" />
              {t("whatsapp")}
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="outlineLight" size="lg" className="w-full">
              <Mail className="h-5 w-5" />
              {t("email")}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
