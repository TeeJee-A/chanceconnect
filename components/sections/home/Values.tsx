import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ShieldCheck, Star, Eye, Heart, Rocket, type LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [ShieldCheck, Star, Eye, Heart, Rocket];

export function Values() {
  const t = useTranslations("home.values");
  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-mint-soft py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3 sm:gap-4">
          {items.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                as="li"
                key={v}
                delay={i * 0.06}
                className="flex items-center gap-3 rounded-full bg-white py-2.5 ps-2.5 pe-6 shadow-card ring-1 ring-line transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-deep text-mint">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold text-deep">{v}</span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
