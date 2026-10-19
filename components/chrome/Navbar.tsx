"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Whatsapp } from "@/components/icons/social";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { key: "services", href: "/leistungen" },
  { key: "applicants", href: "/fuer-bewerber" },
  { key: "employers", href: "/fuer-arbeitgeber" },
  { key: "jobs", href: "/stellenangebote" },
  { key: "about", href: "/ueber-uns" },
  { key: "contact", href: "/kontakt" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-line bg-paper/90 shadow-[0_8px_30px_-20px_rgba(18,78,82,0.35)] backdrop-blur-xl"
          : "border-transparent bg-paper",
      )}
    >
      <nav className="container-site flex h-[4.5rem] items-center justify-between gap-6 sm:h-20">
        <Link href="/" aria-label={SITE.name} className="shrink-0">
          <Logo priority />
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-2.5 py-2 text-sm font-medium whitespace-nowrap transition",
                    active ? "text-deep" : "text-muted hover:bg-mint-soft hover:text-deep",
                  )}
                >
                  {t(l.key)}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-mint"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:block" />
          <Button href="/fuer-bewerber" className="hidden md:inline-flex">
            {tc("applyNow")}
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-deep transition hover:bg-mint-soft xl:hidden"
            aria-label={t("menu")}
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn("fixed inset-0 z-50 overflow-hidden xl:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}
        inert={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-deep/40 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className={cn(
            "absolute inset-y-0 end-0 flex w-[88%] max-w-sm flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            mobileOpen ? "translate-x-0 shadow-lift" : "translate-x-full rtl:-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Logo className="h-10 sm:h-10" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-deep transition hover:bg-mint-soft"
              aria-label={tc("close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
            {[{ key: "home", href: "/" } as const, ...LINKS].map((l) => {
              const active = l.href === "/" ? pathname === "/" : isActive(l.href);
              return (
                <Link
                  key={l.key}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition",
                    active ? "bg-mint-soft text-deep" : "text-ink hover:bg-mint-soft/70",
                  )}
                >
                  {t(l.key)}
                  <ArrowRight className="h-4 w-4 text-teal rtl:rotate-180" />
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-line p-5">
            <LanguageSwitcher variant="inline" />
            <Button href="/fuer-bewerber" size="lg" className="w-full">
              {tc("applyNow")}
            </Button>
            <Button href={SITE.whatsapp.href} variant="secondary" size="lg" className="w-full">
              <Whatsapp className="h-4 w-4 text-teal" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
