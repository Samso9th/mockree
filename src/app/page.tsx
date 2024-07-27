import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { infos } from "@/config/landing";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile />
      <NavBar scroll={true} />
      <main className="flex-1">
        <>
          <HeroLanding />
          <PreviewLanding />
          <Powered />
          <BentoGrid />
          <InfoLanding data={infos[0]} reverse={true} />
          <InfoLanding data={infos[1]} />
          <Features />
          {/* <Testimonials /> */}
        </>
      </main>
      <SiteFooter />
    </div>
  );
}
