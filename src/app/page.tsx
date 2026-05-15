import Hero from "@/components/landing/hero";
import WorkProjectsGrid from "@/components/ecommerce/work/works";
import OriginalWorksBanner from "@/components/ecommerce/work/original-works-banner";
import Page from "@/components/_ui/containers/base/page";
import { LandingFlipbookContainer } from "@/components/landing/flipbook-container";
import AboutSection from "@/components/landing/about-section";
import Section from "@/components/_ui/containers/base/section";
import { storefrontProductService } from "@/lib/api/storefront/services";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [productPage, portfolioPage] = await Promise.all([
    storefrontProductService
      .getProducts({
        IsAvailable: true,
        Page: 1,
        PageSize: 8,
      })
      .catch(() => null),
    storefrontProductService
      .getProducts({
        IsAvailable: false,
        Page: 1,
        PageSize: 4,
      })
      .catch(() => null),
  ]);
  const products = productPage?.items ?? [];
  const portfolioWorks = portfolioPage?.items ?? [];

  return (
    <Page className="home landing">
      {/* <PageToolbar hide={false} /> */}
      <Hero />
      {portfolioWorks.length > 0 && (
        <Section className="mx-auto text-center">
          <WorkProjectsGrid products={portfolioWorks} />
        </Section>
      )}
      <Section className="mx-auto text-center">
        {productPage ? <OriginalWorksBanner products={products} /> : <StoreServerError />}
      </Section>
      <Section className="mx-auto text-center">
        {productPage ? <LandingFlipbookContainer products={products} /> : <StoreServerError />}
      </Section>
      <Section className="mx-auto text-center">
        <AboutSection />
      </Section>
      {/* <NewsletterSignup /> */}
    </Page>
  );
}
