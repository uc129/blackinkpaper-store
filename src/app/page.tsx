import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import AboutSection from "@/components/landing/about-section";
import { FeaturedProductShowcase } from "@/components/landing/featured-product-showcase";
import { LandingFlipbookContainer } from "@/components/landing/flipbook-container";
import Hero from "@/components/landing/hero";
import { storefrontProductService } from "@/lib/api/storefront/services";
import { distinctArtworks } from "@/lib/storefront/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [launchPage, originalPage, printPage] = await Promise.all([
    storefrontProductService
      .getProducts({
        IsAvailable: true,
        Page: 1,
        PageSize: 12,
      })
      .catch(() => null),
    storefrontProductService
      .getProducts({
        CategorySlug: "originals",
        IsAvailable: true,
        IsFeatured: true,
        Page: 1,
        PageSize: 5,
      })
      .catch(() => null),
    storefrontProductService
      .getProducts({
        CategorySlug: "prints",
        IsAvailable: true,
        IsFeatured: true,
        Page: 1,
        PageSize: 5,
      })
      .catch(() => null),
  ]);
  const launches = distinctArtworks(launchPage?.items ?? []);
  const originals = distinctArtworks(
    originalPage?.items.length
      ? originalPage.items
      : launches.filter((product) => product.isOriginal),
  );
  const prints = distinctArtworks(
    printPage?.items.length
      ? printPage.items
      : launches.filter((product) => !product.isOriginal),
  );

  return (
    <Page className="home landing">
      <Hero />
      <Section className="mx-auto py-16 lg:py-24">
        {originalPage || launchPage ? (
          <FeaturedProductShowcase products={originals} kind="original" />
        ) : (
          <StoreServerError />
        )}
      </Section>
      <Section className="mx-auto py-16 lg:py-24">
        {printPage || launchPage ? (
          <FeaturedProductShowcase products={prints} kind="print" />
        ) : (
          <StoreServerError />
        )}
      </Section>
      <Section className="mx-auto py-16 text-center lg:py-24">
        {launchPage ? (
          <LandingFlipbookContainer products={launches} />
        ) : (
          <StoreServerError />
        )}
      </Section>
      <Section className="mx-auto text-center">
        <AboutSection />
      </Section>
    </Page>
  );
}
