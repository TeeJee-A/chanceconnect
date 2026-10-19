import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

/** Reusable inner-page hero with breadcrumb. Reads {badge,title,subtitle} from `namespace`. */
export function PageHero({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const tn = useTranslations("nav");

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-mint-soft to-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="dots absolute inset-y-0 end-0 w-1/2 text-teal/[0.08] [mask-image:linear-gradient(to_left,black,transparent)] rtl:[mask-image:linear-gradient(to_right,black,transparent)]" />
        <Image
          src="/logo-mark.png"
          alt=""
          width={600}
          height={445}
          className="absolute -end-20 top-1/2 hidden w-[30rem] -translate-y-1/2 opacity-[0.13] lg:block"
        />
      </div>

      <div className="container-site relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="animate-fade-up">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/" className="transition hover:text-deep">
                {tn("home")}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </li>
            <li aria-current="page" className="font-semibold text-teal">
              {t("badge")}
            </li>
          </ol>
        </nav>
        <h1
          className="animate-fade-up mt-5 max-w-3xl text-[clamp(2.25rem,4.6vw,3.6rem)] leading-[1.08] font-extrabold tracking-tight text-balance text-deep"
          style={{ animationDelay: "0.08s" }}
        >
          {t("title")}
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ animationDelay: "0.16s" }}
        >
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
