import { useTranslations } from "next-intl";
import { CalendarDays } from "lucide-react";

type Section = { heading: string; body: string[] };

/** Renders a legal document from {updated, sections:[{heading, body[]}]}. */
export function LegalContent({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const sections = t.raw("sections") as Section[];

  return (
    <section className="relative py-14 sm:py-20">
      <div className="container-site">
        <article className="mx-auto max-w-3xl rounded-3xl border border-line bg-white p-7 shadow-card sm:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-mint-soft px-3.5 py-1.5 text-xs font-semibold text-teal">
            <CalendarDays className="h-3.5 w-3.5" />
            {t("updated")}
          </p>

          <div className="mt-10 space-y-9">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-lg font-bold text-deep">{s.heading}</h2>
                <div className="mt-3 space-y-2">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-[0.95rem] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
