import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Quote, ArrowRight } from "lucide-react";

export function SuccessStories() {
  const t = useTranslations("home.stories");

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-site">
        <Reveal className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-card sm:p-12 lg:grid-cols-[1.25fr_0.75fr] lg:p-16">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal">
              <span aria-hidden className="h-1.5 w-6 rounded-full bg-mint" />
              {t("title")}
            </span>
            <Quote className="mt-6 h-10 w-10 text-mint rtl:-scale-x-100" />
            <p className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance text-deep sm:text-4xl">
              {t("quote")}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t("subtitle")}</p>
            <div className="mt-8">
              <Button href="/fuer-bewerber" size="lg">
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
              </Button>
            </div>
          </div>

          <div aria-hidden className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-mint-soft" />
            <div className="absolute inset-8 rounded-full border-2 border-dashed border-mint/50" />
            <Image src="/logo-mark.png" alt="" width={600} height={445} className="relative w-3/4" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
