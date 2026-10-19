import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { localeAlternates } from "@/lib/seo";
import { HeartPulse, ChefHat, Hotel, Wrench, Factory, LayoutGrid } from "lucide-react";

const PATH = "/stellenangebote";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jobs.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}${PATH}`, languages: localeAlternates(PATH) },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero namespace="jobs.hero" />
      <FeatureGrid
        namespace="jobs.roles"
        icons={[HeartPulse, ChefHat, Hotel, Wrench, Factory, LayoutGrid]}
      />
      <FinalCTA />
    </>
  );
}
