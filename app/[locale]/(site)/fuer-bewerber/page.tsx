import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { localeAlternates } from "@/lib/seo";
import { GraduationCap, Briefcase, FileText, Stamp, Video, PlaneTakeoff } from "lucide-react";

const PATH = "/fuer-bewerber";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bewerber.meta" });
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
      <PageHero namespace="bewerber.hero" />
      <FeatureGrid
        namespace="bewerber.services"
        icons={[GraduationCap, Briefcase, FileText, Stamp, Video, PlaneTakeoff]}
      />
      <ChecklistSection namespace="bewerber.arrival" muted />
      <FinalCTA />
      <ContactFormSection source="bewerber" defaultRole="applicant" />
    </>
  );
}
