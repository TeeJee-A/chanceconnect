import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import {
  HeartHandshake,
  Globe2,
  MonitorSmartphone,
  Target,
  PlaneTakeoff,
  Languages,
} from "lucide-react";

const ICONS = [HeartHandshake, Globe2, MonitorSmartphone, Target, PlaneTakeoff, Languages];

type Item = { title: string; desc: string };

/** Deep-teal band: heading beside a two-column list of reasons. */
export function WhyUs() {
  const t = useTranslations("home.whyUs");
  const items = t.raw("items") as Item[];

  return (
    <section className="relative overflow-hidden bg-deep py-20 sm:py-24">
      <div
        aria-hidden
        className="dots pointer-events-none absolute inset-0 text-white/[0.05] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div aria-hidden className="absolute -end-32 -bottom-32 h-96 w-96 rounded-full bg-mint/10 blur-3xl" />

      <div className="container-site relative grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} align="start" tone="dark" className="lg:sticky lg:top-28 lg:self-start" />

        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.05}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.08]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint/15 text-mint">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/70">{item.desc}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
