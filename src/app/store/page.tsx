import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { NavLink } from "@/components/_ui/primitives/links";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { storefrontProductService } from "@/lib/api/storefront/services";
import { storefrontCategories } from "@/lib/api/storefront/categories";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";

export const dynamic = "force-dynamic";

export default async function StoreLandingPage() {
  const productPage = await storefrontProductService
    .getProducts({
      IsAvailable: true,
      Page: 1,
      PageSize: 24,
    })
    .catch(() => null);

  return (
    <Page>
      <Section className="mx-auto">
        <ContainerSimple className="gap-16">
          <div className="text-center">
            <Heading size="title" className="font-display font-bold text-[var(--ink)]">
              Store
            </Heading>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
              Original illustrations and prints, gathered in a quiet studio store.
            </p>
          </div>

          <div className="mx-auto flex flex-wrap justify-center gap-6 border-b border-[var(--border)] pb-4">
            {storefrontCategories.map((category) => (
              <NavLink
                key={category.slug}
                href={`/store/shop/category/${category.slug}`}
                text={category.label}
                linkSize="md"
              />
            ))}
          </div>
          <ContainerSimple>
            {productPage ? <ProductGrid products={productPage.items} hover /> : <StoreServerError />}
          </ContainerSimple>
        </ContainerSimple>
      </Section>
    </Page>
  );
}
