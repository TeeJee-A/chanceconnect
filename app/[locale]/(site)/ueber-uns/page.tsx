import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSection } from "@/components/sections/ProseSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { localeAlternates } from "@/lib/seo";
import { HeartHandshake, Eye, Globe2 } from "lucide-react";

const PATH = "/ueber-uns";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
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
      <PageHero namespace="about.hero" />
      <ProseSection namespace="about.intro" />
      <FeatureGrid namespace="about.pillars" icons={[HeartHandshake, Eye, Globe2]} muted />
      <FinalCTA />
    </>
  );
}
