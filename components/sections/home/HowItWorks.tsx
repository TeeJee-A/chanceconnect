"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { Users, Briefcase, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Step = { title: string; desc: string };

const TABS = [
  { key: "applicant", Icon: Users, href: "/fuer-bewerber", cta: "applyNow" },
  { key: "employer", Icon: Briefcase, href: "/fuer-arbeitgeber", cta: "requestStaff" },
] as const;

/** Applicant / employer process as a tabbed timeline — one path at a time. */
export function HowItWorks() {
  const t = useTranslations("home.howItWorks");
  const tc = useTranslations("common");
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("applicant");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const tab = TABS.find((x) => x.key === active)!;
  const steps = t.raw(active === "applicant" ? "applicantSteps" : "employerSteps") as Step[];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const i = TABS.findIndex((x) => x.key === active);
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setActive(TABS[next].key);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label={t("title")}
            onKeyDown={onKeyDown}
            className="inline-grid grid-cols-2 gap-1 rounded-2xl bg-mint-soft p-1.5"
          >
            {TABS.map(({ key, Icon }, i) => {
              const selected = key === active;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`${id}-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(key)}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition sm:px-7",
                    selected ? "bg-white text-deep shadow-card" : "text-muted hover:text-deep",
                  )}
                >
                  <Icon className={cn("h-4 w-4", selected && "text-teal")} />
                  {t(key === "applicant" ? "applicantTitle" : "employerTitle")}
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={active}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          className="animate-fade-up mt-12"
        >
          <ol
            className={cn(
              "grid gap-8 lg:gap-6",
              steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
            )}
          >
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 lg:block">
                {/* Connector: vertical on mobile, horizontal on desktop */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute start-6 top-14 bottom-[-2rem] w-0.5 bg-line lg:start-16 lg:end-[-1.5rem] lg:top-6 lg:bottom-auto lg:h-0.5 lg:w-auto"
                  />
                )}
                <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-white text-lg font-bold text-deep ring-8 ring-paper">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <h3 className="font-bold text-deep">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex justify-center">
            <Button href={tab.href} size="lg">
              {tc(tab.cta)}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
