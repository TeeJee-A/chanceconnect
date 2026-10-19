import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/utils";

type Item = { title: string; desc: string };

/** Reusable grid of icon feature cards. Reads {title,subtitle,items[]} from `namespace`. */
export function FeatureGrid({
  namespace,
  icons,
  columns = 3,
  muted = false,
}: {
  namespace: string;
  icons: LucideIcon[];
  columns?: 2 | 3;
  muted?: boolean;
}) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as Item[];

  return (
    <section className={cn("relative py-20 sm:py-24", muted && "bg-mint-soft")}>
      <div className="container-site">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div
          className={cn(
            "mt-12 grid gap-5",
            columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group h-full rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-soft text-teal transition-colors duration-500 group-hover:bg-deep group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-deep">{item.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
