import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import OriginalWorksBanner from "@/components/ecommerce/work/original-works-banner";
import WorkProjectsGrid from "@/components/ecommerce/work/works";
import AboutSection from "@/components/landing/about-section";
import { LandingFlipbookContainer } from "@/components/landing/flipbook-container";
import Hero from "@/components/landing/hero";
import { storefrontProductService } from "@/lib/api/storefront/services";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [productPage, originalPage, portfolioPage] = await Promise.all([
    storefrontProductService
      .getProducts({
        IsAvailable: true,
        Page: 1,
        PageSize: 8,
      })
      .catch(() => null),
    storefrontProductService
      .getProducts({
        CategorySlug: "originals",
        IsAvailable: true,
        Page: 1,
        PageSize: 3,
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
  const originals =
    originalPage?.items ?? products.filter((product) => product.isOriginal);
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
        {originalPage || productPage ? (
          <OriginalWorksBanner products={originals} />
        ) : (
          <StoreServerError />
        )}
      </Section>
      <Section className="mx-auto text-center">
        {productPage ? (
          <LandingFlipbookContainer products={products} />
        ) : (
          <StoreServerError />
        )}
      </Section>
      <Section className="mx-auto text-center">
        <AboutSection />
      </Section>
      {/* <NewsletterSignup /> */}
    </Page>
  );
}
