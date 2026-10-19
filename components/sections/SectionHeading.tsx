import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Shared section heading — optional eyebrow, bold title, muted subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  tone?: "light" | "dark";
  className?: string;
}) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <Reveal className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]",
            dark ? "text-mint" : "text-teal",
          )}
        >
          <span aria-hidden className="h-1.5 w-6 rounded-full bg-mint" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-display leading-[1.12] font-bold tracking-tight text-balance",
          dark ? "text-white" : "text-deep",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-white/75" : "text-muted",
            centered && "mx-auto max-w-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
