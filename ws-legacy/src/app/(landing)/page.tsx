import { LandingHeader } from "@/domains/landing/components/LandingHeader";
import { HeroSection } from "@/domains/landing/components/HeroSection";
import { IndustrySection } from "@/domains/landing/components/IndustrySection";
import { BusinessSection } from "@/domains/landing/components/BusinessSection";
import { PriceSection } from "@/domains/landing/components/PriceSection";
import { DemoSection } from "@/domains/landing/components/DemoSection";
import { FooterSection } from "@/domains/landing/components/Footer";
import { nextAuthService } from "@/common/libs/NextAuthService";
export default async function LandingPage() {
  const session = await nextAuthService.getSession();

  return (
    <>
      <LandingHeader />
      <main className="z-10 flex flex-col gap-20 mobile:gap-0">
        <HeroSection />
        <IndustrySection />
        <BusinessSection />
        <PriceSection session={session} />
        <div className="mt-[140px] mobile:mt-[120px]">
          <DemoSection />
          <FooterSection />
        </div>
      </main>
    </>
  );
}
