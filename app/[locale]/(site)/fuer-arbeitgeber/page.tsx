import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { StepsSection } from "@/components/sections/StepsSection";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { localeAlternates } from "@/lib/seo";
import {
  GraduationCap,
  UserCheck,
  ClipboardCheck,
  Video,
  FileText,
  Headset,
  Handshake,
  Rocket,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const PATH = "/fuer-arbeitgeber";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "arbeitgeber.meta" });
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
      <PageHero namespace="arbeitgeber.hero" />
      <FeatureGrid
        namespace="arbeitgeber.services"
        icons={[GraduationCap, UserCheck, ClipboardCheck, Video, FileText, Headset, Handshake]}
      />
      <StepsSection namespace="arbeitgeber.process" muted />
      <FeatureGrid
        namespace="arbeitgeber.why"
        icons={[Rocket, BookOpen, GraduationCap, ShieldCheck, Handshake]}
      />
      <FinalCTA />
      <ContactFormSection source="arbeitgeber" defaultRole="employer" />
    </>
  );
}
