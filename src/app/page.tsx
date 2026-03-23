'use client'
import Hero from "@/components/landing/hero";
import WorkProjectsGrid from "@/components/ecommerce/work/works";
import OriginalWorksBanner from "@/components/ecommerce/work/original-works-banner";
import Page from "@/components/_ui/containers/base/page";
import { LandingFlipbookContainer } from "@/components/landing/flipbook-container";
import AboutSection from "@/components/landing/about-section";
import Section from "@/components/_ui/containers/base/section";
import PageToolbar from "./page-toolbar";



export default function Home() {
  const handleToolbarEvents = (type: string) => {
    if (type === 'save') {
        console.log("Saving blog post to ASP.NET Backend...");
    }
  };
  return (
    <Page className="home landing">
      {/* <PageToolbar hide={false} /> */}
      <Hero />
      <Section className="mx-auto text-center">
        <WorkProjectsGrid />
      </Section>
      <Section className="mx-auto text-center">
        <OriginalWorksBanner />
      </Section>
      <Section className="mx-auto text-center">
        <LandingFlipbookContainer />
      </Section>
      <Section className="mx-auto text-center">
        <AboutSection />
      </Section>
      {/* <NewsletterSignup /> */}
    </Page>
  );
}
