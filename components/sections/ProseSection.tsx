import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Title beside running prose. Reads {title, paragraphs:string[]} from `namespace`. */
export function ProseSection({
  namespace,
  muted = false,
}: {
  namespace: string;
  muted?: boolean;
}) {
  const t = useTranslations(namespace);
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className={cn("relative py-20 sm:py-24", muted && "bg-mint-soft")}>
      <Reveal className="container-site grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <span aria-hidden className="mb-5 block h-1.5 w-10 rounded-full bg-mint" />
          <h2 className="text-display leading-[1.12] font-bold tracking-tight text-deep">{t("title")}</h2>
        </div>
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className={cn("leading-relaxed text-muted", i === 0 ? "text-xl text-ink" : "text-lg")}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
