import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/utils";

type Step = { title: string; desc: string };

/** Reusable numbered-steps grid. Reads {title,subtitle,steps[]} from `namespace`. */
export function StepsSection({
  namespace,
  muted = false,
}: {
  namespace: string;
  muted?: boolean;
}) {
  const t = useTranslations(namespace);
  const steps = t.raw("steps") as Step[];

  return (
    <section className={cn("relative py-20 sm:py-24", muted && "bg-mint-soft")}>
      <div className="container-site">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.05}
              className="relative flex h-full gap-5 rounded-3xl border border-line bg-white p-6 shadow-card"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-deep text-base font-bold text-white ring-4 ring-mint-soft">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-deep">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
