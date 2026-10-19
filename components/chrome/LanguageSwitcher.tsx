"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe, Check, ChevronDown } from "lucide-react";

export function LanguageSwitcher({
  className,
  variant = "dropdown",
}: {
  className?: string;
  variant?: "dropdown" | "inline";
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  // Inline variant — all languages as a segmented row (mobile drawer, where a
  // dropdown would open off-screen).
  if (variant === "inline") {
    return (
      <div className={cn("grid grid-cols-4 gap-1 rounded-xl bg-mint-soft p-1", className)}>
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => switchTo(l)}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "rounded-lg px-2 py-2 text-sm font-semibold transition",
              l === locale ? "bg-white text-deep shadow-card" : "text-muted hover:text-deep",
            )}
          >
            {localeLabels[l].short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-deep transition hover:border-teal/40 hover:bg-mint-soft"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={localeLabels[locale].native}
      >
        <Globe className="h-4 w-4 text-teal" />
        <span className="tabular-nums">{localeLabels[locale].short}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 min-w-[11rem] origin-top overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                lang={l}
                onClick={() => switchTo(l)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  l === locale
                    ? "bg-mint-soft font-semibold text-deep"
                    : "text-muted hover:bg-mint-soft/60 hover:text-deep",
                )}
              >
                <span>{localeLabels[l].native}</span>
                {l === locale && <Check className="h-4 w-4 text-teal" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
