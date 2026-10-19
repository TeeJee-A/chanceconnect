import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HeartPulse, ChefHat, Hotel, Wrench, Factory, LayoutGrid, ArrowRight } from "lucide-react";

const ICONS = [HeartPulse, ChefHat, Hotel, Wrench, Factory, LayoutGrid];

type Item = { name: string; desc: string };

export function Sectors() {
  const t = useTranslations("home.sectors");
  const items = t.raw("items") as Item[];

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.name} delay={i * 0.05}>
                <Link
                  href="/stellenangebote"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lift"
                >
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mint-soft text-teal transition-colors duration-500 group-hover:bg-deep group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-deep">{item.name}</h3>
                    <p className="truncate text-sm text-muted">{item.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-teal opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <Button href="/stellenangebote" variant="secondary" size="lg">
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
