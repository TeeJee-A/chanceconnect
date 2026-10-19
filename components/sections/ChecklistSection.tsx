import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/utils";

/** Heading beside a checklist. Reads {title,subtitle,items:string[]} from `namespace`. */
export function ChecklistSection({
  namespace,
  muted = false,
}: {
  namespace: string;
  muted?: boolean;
}) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as string[];

  return (
    <section className={cn("relative py-20 sm:py-24", muted && "bg-mint-soft")}>
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} align="start" className="lg:sticky lg:top-28" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={i * 0.035}
              className="flex h-full items-center gap-3.5 rounded-2xl border border-line bg-white px-5 py-4 shadow-card"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint/30 text-deep">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-[0.95rem] font-medium text-ink">{item}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
