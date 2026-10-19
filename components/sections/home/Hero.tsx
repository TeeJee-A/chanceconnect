import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MapPin, ArrowRight, Check, Plane, BadgeCheck, Languages } from "lucide-react";

const STATS = [
  { key: "satisfaction", value: "100%" },
  { key: "languages", value: "4" },
  { key: "support", value: "100%" },
] as const;

/** Journey status of each step in the illustrative hero card. */
const STEP_STATUS = ["done", "done", "current", "next"] as const;

/** Illustrative "your path" card: Morocco → Germany, with the process at a glance. */
function JourneyCard() {
  const t = useTranslations("home.hero.journey");
  const steps = t.raw("steps") as string[];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-[30rem]">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-mint/40 via-mint-soft to-transparent blur-2xl"
      />

      <div className="relative rounded-[2rem] border border-white bg-white/95 p-5 shadow-lift sm:p-7">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="" width={56} height={42} className="h-9 w-auto" />
          <p className="flex-1 font-bold text-deep">{t("title")}</p>
          <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[0.7rem] font-semibold text-teal">
            {t("chip")}
          </span>
        </div>

        {/* Route */}
        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-mint-soft p-3 sm:gap-3 sm:p-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-deep shadow-card">
              MA
            </span>
            <span className="text-xs font-semibold text-deep sm:text-sm">{t("from")}</span>
          </div>
          <div aria-hidden className="relative flex flex-1 items-center">
            <span className="h-0 flex-1 border-t-2 border-dashed border-teal/35" />
            <Plane className="mx-1 h-4 w-4 text-teal rtl:-scale-x-100" />
            <span className="h-0 flex-1 border-t-2 border-dashed border-teal/35" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-deep sm:text-sm">{t("to")}</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-deep text-xs font-bold text-white">
              DE
            </span>
          </div>
        </div>

        {/* Steps */}
        <ol className="mt-5 space-y-2.5">
          {steps.map((s, i) => {
            const status = STEP_STATUS[i] ?? "next";
            return (
              <li
                key={s}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3.5 py-3",
                  status === "current" ? "border-teal/30 bg-mint-soft/60" : "border-line",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    status === "done" && "bg-mint/35 text-deep",
                    status === "current" && "bg-deep text-white",
                    status === "next" && "border border-line text-muted",
                  )}
                >
                  {status === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span className={cn("min-w-0 flex-1 text-sm font-semibold hyphens-auto", status === "next" ? "text-muted" : "text-ink")}>
                  {s}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-[0.7rem] font-semibold",
                    status === "done" && "text-teal",
                    status === "current" && "text-deep",
                    status === "next" && "text-muted",
                  )}
                >
                  {t(`status.${status}`)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Floating chips */}
      <div className="animate-float absolute -bottom-6 -start-3 flex items-center gap-2 rounded-2xl bg-deep px-4 py-3 text-sm font-semibold text-white shadow-lift sm:-start-8">
        <BadgeCheck className="h-5 w-5 text-mint" />
        {t("employerFree")}
      </div>
      <div
        className="animate-float absolute -top-5 -end-2 hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-deep shadow-lift ring-1 ring-line sm:flex sm:-end-6"
        style={{ animationDelay: "-3.5s" }}
      >
        <Languages className="h-5 w-5 text-teal" />
        {t("languages")}
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("common");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mint-soft via-mint-soft/50 to-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="dots absolute -top-10 end-0 h-80 w-1/2 text-teal/[0.09] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] rtl:[mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="absolute -start-40 top-40 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />
      </div>

      <div className="container-site relative grid grid-cols-1 items-center gap-16 pt-10 pb-24 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-16 lg:pb-28">
        <div>
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-teal shadow-card ring-1 ring-line"
            style={{ animationDelay: "0.05s" }}
          >
            <MapPin className="h-3.5 w-3.5" />
            {t("badge")}
          </span>

          <h1
            className="animate-fade-up mt-6 text-hero leading-[1.05] font-extrabold tracking-tight text-balance text-deep"
            style={{ animationDelay: "0.12s" }}
          >
            {t("titleLead")} <span className="highlight text-teal">{t("titleAccent")}</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "0.2s" }}
          >
            {t("subtitle")}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.28s" }}
          >
            <Button href="/fuer-bewerber" size="lg">
              {tc("iAmApplicant")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
            </Button>
            <Button href="/fuer-arbeitgeber" size="lg" variant="secondary">
              {tc("iAmEmployer")}
            </Button>
          </div>

          <div
            className="animate-fade-up mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8"
            style={{ animationDelay: "0.36s" }}
          >
            {STATS.map((s) => (
              <div key={s.key}>
                <p className="text-3xl font-extrabold tracking-tight text-deep tabular-nums">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{t(`stats.${s.key}`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <JourneyCard />
        </div>
      </div>
    </section>
  );
}
