import { notFound } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import {
  StoreCategoryMenu,
  StoreSubcategoryMenu,
} from "@/components/ecommerce/store/StoreCategoryMenu";
import {
  findCategoryBySlug,
  getCatalogLabel,
  getStorefrontCatalog,
} from "@/lib/api/storefront/categories";
import { storefrontProductService } from "@/lib/api/storefront/services";

export const dynamic = "force-dynamic";

export default async function SubcategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string; subCategorySlug: string }>;
}) {
  const { slug, subCategorySlug } = await params;
  const catalog = await getStorefrontCatalog().catch(() => null);

  if (!catalog) {
    return (
      <Page>
        <StoreServerError message="Collections could not load because the store server is unavailable." />
      </Page>
    );
  }

  const category = findCategoryBySlug(catalog, slug);
  const subcategory = category?.subcategories.find(
    (item) => item.slug === subCategorySlug,
  );
  if (!category || !subcategory) notFound();

  const productPage = await storefrontProductService
    .getProducts({
      CategorySlug: slug,
      SubCategorySlug: subCategorySlug,
      IsAvailable: true,
      Page: 1,
      PageSize: 24,
    })
    .catch(() => null);

  return (
    <Page>
      <Section className="mx-auto">
        <ContainerSimple className="gap-14">
          <div className="text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
              {getCatalogLabel(category)}
            </p>
            <Heading
              size="title"
              className="font-display font-bold text-[var(--ink)]"
            >
              {getCatalogLabel(subcategory)}
            </Heading>
            {subcategory.description && (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
                {subcategory.description}
              </p>
            )}
          </div>
          <StoreCategoryMenu catalog={catalog} activeCategorySlug={slug} />
          <StoreSubcategoryMenu
            category={category}
            activeSubcategorySlug={subCategorySlug}
          />
          {productPage ? (
            productPage.items.length > 0 ? (
              <ProductGrid products={productPage.items} hover />
            ) : (
              <p className="py-12 text-center text-[var(--ink-soft)]">
                No artworks are available in this collection right now.
              </p>
            )
          ) : (
            <StoreServerError />
          )}
        </ContainerSimple>
      </Section>
    </Page>
  );
}
