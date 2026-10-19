import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/utils";
import { Users, Briefcase, Check, ArrowRight } from "lucide-react";

function AudienceCard({
  href,
  label,
  title,
  desc,
  points,
  cta,
  Icon,
  tone,
  delay,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  Icon: typeof Users;
  tone: "applicant" | "employer";
  delay: number;
}) {
  const dark = tone === "employer";

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={href}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1.5 sm:p-10",
          dark ? "bg-deep text-white shadow-lift" : "border border-line bg-white shadow-card hover:shadow-lift",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute -end-20 -top-20 h-60 w-60 rounded-full transition-transform duration-700 group-hover:scale-110",
            dark ? "bg-mint/15" : "bg-mint-soft",
          )}
        />

        <div className="relative flex items-center gap-4">
          <span
            className={cn(
              "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
              dark ? "bg-white/10 text-mint" : "bg-mint-soft text-teal",
            )}
          >
            <Icon className="h-6 w-6" />
          </span>
          <span className={cn("text-xs font-bold uppercase tracking-[0.16em]", dark ? "text-mint" : "text-teal")}>
            {label}
          </span>
        </div>

        <h3
          className={cn(
            "relative mt-7 text-2xl leading-tight font-bold sm:text-3xl",
            dark ? "text-white" : "text-deep",
          )}
        >
          {title}
        </h3>
        <p className={cn("relative mt-3 leading-relaxed", dark ? "text-white/75" : "text-muted")}>{desc}</p>

        <ul className="relative mt-7 space-y-3">
          {points.map((p) => (
            <li
              key={p}
              className={cn("flex items-center gap-3 text-[0.95rem] font-medium", dark ? "text-white/90" : "text-ink")}
            >
              <span
                className={cn(
                  "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  dark ? "bg-mint text-deep" : "bg-mint/30 text-deep",
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <span
          className={cn(
            "relative mt-auto inline-flex items-center gap-2 pt-9 font-semibold",
            dark ? "text-mint" : "text-teal",
          )}
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

export function AudienceSplit() {
  const t = useTranslations("home.audience");

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AudienceCard
            href="/fuer-bewerber"
            label={t("applicant.label")}
            title={t("applicant.title")}
            desc={t("applicant.desc")}
            points={t.raw("applicant.points") as string[]}
            cta={t("applicant.cta")}
            Icon={Users}
            tone="applicant"
            delay={0}
          />
          <AudienceCard
            href="/fuer-arbeitgeber"
            label={t("employer.label")}
            title={t("employer.title")}
            desc={t("employer.desc")}
            points={t.raw("employer.points") as string[]}
            cta={t("employer.cta")}
            Icon={Briefcase}
            tone="employer"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}
