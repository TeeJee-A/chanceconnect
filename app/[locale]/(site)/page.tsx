import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/home/Hero";
import { AudienceSplit } from "@/components/sections/home/AudienceSplit";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { Sectors } from "@/components/sections/home/Sectors";
import { Values } from "@/components/sections/home/Values";
import { SuccessStories } from "@/components/sections/home/SuccessStories";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AudienceSplit />
      <ServicesSection />
      <HowItWorks />
      <WhyUs />
      <Sectors />
      <Values />
      <SuccessStories />
      <FinalCTA />
      <ContactFormSection />
    </>
  );
}
