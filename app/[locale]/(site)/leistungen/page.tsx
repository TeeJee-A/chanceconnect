import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { localeAlternates } from "@/lib/seo";

const PATH = "/leistungen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
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
      <PageHero namespace="services.hero" />
      <ServicesSection withHeading={false} />
      <HowItWorks />
      <FinalCTA />
      <ContactFormSection source="leistungen" />
    </>
  );
}
