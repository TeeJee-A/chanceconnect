"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Whatsapp } from "@/components/icons/social";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const tn = useTranslations("nav");
  const items = t.raw("items") as Item[];
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        {/* Intro + escape hatch to a human */}
        <div className="lg:sticky lg:top-28">
          <span aria-hidden className="mb-5 block h-1.5 w-10 rounded-full bg-mint" />
          <h2 className="text-display leading-[1.12] font-bold tracking-tight text-deep">{t("title")}</h2>
          <div className="mt-8 rounded-3xl bg-deep p-7 text-white">
            <MessageCircleQuestion className="h-8 w-8 text-mint" />
            <p className="mt-4 leading-relaxed text-white/80">{t("subtitle")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={SITE.whatsapp.href} variant="light">
                <Whatsapp className="h-4 w-4 text-teal" />
                WhatsApp
              </Button>
              <Button href="/kontakt" variant="outlineLight">
                {tn("contact")}
              </Button>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div
                key={item.q}
                className={cn(
                  "rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300",
                  isOpen ? "border-teal/30 shadow-card" : "border-line",
                )}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className="font-semibold text-deep">{item.q}</span>
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        isOpen ? "rotate-45 bg-deep text-white" : "bg-mint-soft text-teal",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={cn(
                    "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
