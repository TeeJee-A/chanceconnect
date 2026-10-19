import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outlineLight";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-[transform,background-color,box-shadow,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/50 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  /** Deep teal — the main call to action on light surfaces. */
  primary: "bg-deep text-white shadow-card hover:bg-deep-dark hover:-translate-y-0.5 hover:shadow-lift",
  /** White with a hairline — the quieter companion to `primary`. */
  secondary: "border border-line bg-white text-deep hover:border-teal/40 hover:bg-mint-soft",
  /** White fill for dark (deep teal) surfaces. */
  light: "bg-white text-deep hover:bg-mint-soft hover:-translate-y-0.5",
  /** Outline for dark (deep teal) surfaces. */
  outlineLight: "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const external = /^(https?:|mailto:|tel:|#)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(rest as ComponentPropsWithoutRef<"a">)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
