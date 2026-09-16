import Link from "next/link";
import Page from "@/components/_ui/containers/base/page";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import Hero from "@/components/landing/hero";
import { EditorialArtworkGrid } from "@/features/storefront/editorial/EditorialArtworkGrid";
import { EditorialProductRail } from "@/features/storefront/editorial/EditorialProductRail";
import { EditorialSectionHeader } from "@/features/storefront/editorial/EditorialSectionHeader";
import { HomeArtistStory } from "@/features/storefront/home/HomeArtistStory";
import { HomeCloseups } from "@/features/storefront/home/HomeCloseups";
import { storefrontProductService } from "@/lib/api/storefront/services";
import { distinctArtworks } from "@/lib/storefront/products";
import { formatPriceToIntl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const HOMEPAGE_ORIGINALS_LIMIT = 4;

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
        Page: 1,
        PageSize: HOMEPAGE_ORIGINALS_LIMIT,
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
  const launchCandidates = launchPage?.items ?? [];
  const launches = distinctArtworks(launchCandidates);
  const originalCandidates = originalPage?.items.length
    ? originalPage.items
    : launchCandidates.filter((product) => product.isOriginal);
  const printCandidates = printPage?.items.length
    ? printPage.items
    : launchCandidates.filter((product) => !product.isOriginal);
  const originals = distinctArtworks(originalCandidates);
  const prints = distinctArtworks(printCandidates, originals);
  const homepageOriginals = originals.slice(0, HOMEPAGE_ORIGINALS_LIMIT);
  const startingPrint = prints.reduce(
    (lowest, product) =>
      product.pricing.finalPrice < lowest.pricing.finalPrice ? product : lowest,
    prints[0],
  );
  const printRailTitle = startingPrint
    ? `From ${formatPriceToIntl(
        startingPrint.pricing.finalPrice,
        startingPrint.pricing.currencyCode || "INR",
      )}, signed`
    : "Signed fine art prints";

  return (
    <Page className="storefront-editorial-page home-editorial">
      <Hero />
      <section className="home-editorial__originals">
        <EditorialSectionHeader
          title="Available originals"
          meta={`${homepageOriginals.length} works · studio, New Delhi`}
        />
        {originalPage || launchPage ? (
          <EditorialArtworkGrid products={homepageOriginals} />
        ) : (
          <StoreServerError />
        )}
        <div className="home-editorial__catalogue-link">
          <Link
            href="/store/shop/category/originals"
            className="editorial-pill editorial-pill--outline"
          >
            View the full catalogue
          </Link>
        </div>
      </section>

      {printPage || launchPage ? (
        <EditorialProductRail
          products={prints.slice(0, 6)}
          eyebrow="Prints and editions"
          title={printRailTitle}
          linkLabel="All prints"
          linkHref="/store/shop/category/prints"
        />
      ) : (
        <StoreServerError />
      )}

      <HomeArtistStory />
      <HomeCloseups products={[...homepageOriginals, ...launches]} />
    </Page>
  );
}
