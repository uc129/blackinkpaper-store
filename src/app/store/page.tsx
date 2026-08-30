import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import { StoreCategoryMenu } from "@/components/ecommerce/store/StoreCategoryMenu";
import { getStorefrontCatalog } from "@/lib/api/storefront/categories";
import { storefrontProductService } from "@/lib/api/storefront/services";

export const dynamic = "force-dynamic";

export default async function StoreLandingPage() {
  const [productPage, catalog] = await Promise.all([
    storefrontProductService
      .getProducts({
        IsAvailable: true,
        Page: 1,
        PageSize: 24,
      })
      .catch(() => null),
    getStorefrontCatalog().catch(() => null),
  ]);

  return (
    <Page>
      <Section className="mx-auto">
        <ContainerSimple className="gap-16">
          <div className="text-center">
            <Heading
              size="title"
              className="font-display font-bold text-[var(--ink)]"
            >
              Store
            </Heading>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
              Original illustrations and prints, gathered in a quiet studio
              store.
            </p>
          </div>

          {catalog ? (
            <StoreCategoryMenu catalog={catalog} />
          ) : (
            <p className="text-center text-sm text-[var(--ink-soft)]">
              Collections are temporarily unavailable.
            </p>
          )}
          <ContainerSimple>
            {productPage ? (
              productPage.items.length > 0 ? (
                <ProductGrid products={productPage.items} hover />
              ) : (
                <p className="py-12 text-center text-[var(--ink-soft)]">
                  No artworks are available right now.
                </p>
              )
            ) : (
              <StoreServerError />
            )}
          </ContainerSimple>
        </ContainerSimple>
      </Section>
    </Page>
  );
}
