import { useTranslations } from "next-intl";
import { GraduationCap, Briefcase, Building2, School, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ICONS = [GraduationCap, Briefcase, Building2, School];

type Item = { tag: string; title: string; desc: string };

/**
 * "Unsere Leistungen" — the four numbered services. On the home page it
 * carries its own heading + link to /leistungen; on /leistungen the page
 * hero already introduces it, so `withHeading={false}`.
 */
export function ServicesSection({
  withHeading = true,
  className,
}: {
  withHeading?: boolean;
  className?: string;
}) {
  const t = useTranslations("services.section");
  const items = t.raw("items") as Item[];

  return (
    <section className={cn("relative bg-mint-soft py-20 sm:py-24", className)}>
      <div className="container-site">
        {withHeading && (
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        )}

        <ol className={cn("grid gap-5 md:grid-cols-2", withHeading && "mt-12")}>
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.06}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-5xl leading-none font-extrabold tracking-tight text-mint tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-soft text-teal transition-colors duration-500 group-hover:bg-deep group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <span className="mt-6 inline-flex w-fit rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold text-teal">
                  {item.tag}
                </span>
                <h3 className="mt-3 text-xl leading-snug font-bold text-deep">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.desc}</p>
              </Reveal>
            );
          })}
        </ol>

        {withHeading && (
          <Reveal className="mt-10 text-center">
            <Button href="/leistungen" variant="secondary" size="lg">
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
