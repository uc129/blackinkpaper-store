import { notFound, redirect } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import { OriginalProductList } from "@/components/ecommerce/store/OriginalProductList";
import { RecommendationList } from "@/components/ecommerce/store/RecommendationList";
import { StoreCategoryMenu } from "@/components/ecommerce/store/StoreCategoryMenu";
import { StorePagination } from "@/components/ecommerce/store/StorePagination";
import {
  findCategoryBySlug,
  getCatalogLabel,
  getStorefrontCatalog,
} from "@/lib/api/storefront/categories";
import { getProductSuggestions } from "@/lib/api/storefront/recommendations";
import { storefrontProductService } from "@/lib/api/storefront/services";
import {
  buildPaginatedPath,
  getPageCount,
  parsePageParam,
} from "@/lib/storefront/pagination";

export const dynamic = "force-dynamic";

export default async function SubcategoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; subCategorySlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ slug, subCategorySlug }, query] = await Promise.all([
    params,
    searchParams,
  ]);
  const pathname = `/store/shop/category/${slug}/${subCategorySlug}`;
  const requestedPage = parsePageParam(query.page);
  if (requestedPage === null) redirect(buildPaginatedPath(pathname, 1, query));

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

  const isOriginals = slug === "originals";
  const pageSize = isOriginals ? 4 : 8;
  const productPage = await storefrontProductService
    .getProducts({
      CategorySlug: slug,
      SubCategorySlug: subCategorySlug,
      IsAvailable: true,
      Page: requestedPage,
      PageSize: pageSize,
    })
    .catch(() => null);

  if (!productPage) {
    return (
      <Page>
        <StoreServerError />
      </Page>
    );
  }

  const pageCount = getPageCount(productPage.totalCount, pageSize);
  if (requestedPage > pageCount) {
    redirect(buildPaginatedPath(pathname, pageCount, query));
  }

  const suggestions = await getProductSuggestions({
    query: { CategorySlug: slug, SubCategorySlug: subCategorySlug },
    excludedIds: new Set(productPage.items.map((product) => product.id)),
    limit: isOriginals ? 3 : 4,
  });

  return (
    <Page>
      <Section className="mx-auto">
        <ContainerSimple className="gap-12 lg:gap-16">
          <div className={isOriginals ? "max-w-3xl" : "text-center"}>
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {getCatalogLabel(category)}
            </p>
            <Heading
              size={isOriginals ? "h1" : "title"}
              className="font-display font-bold text-[var(--ink)]"
            >
              {getCatalogLabel(subcategory)}
            </Heading>
            {subcategory.description && (
              <p
                className={`mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)] ${
                  isOriginals ? "" : "mx-auto"
                }`}
              >
                {subcategory.description}
              </p>
            )}
          </div>

          <StoreCategoryMenu catalog={catalog} activeCategorySlug={slug} />

          <div id="products" className="scroll-mt-28">
            {productPage.items.length > 0 ? (
              isOriginals ? (
                <OriginalProductList products={productPage.items} />
              ) : (
                <div className="store-catalog-layout gap-10">
                  <ProductGrid products={productPage.items} hover />
                  <RecommendationList products={suggestions} />
                </div>
              )
            ) : (
              <p className="py-12 text-center text-[var(--ink-soft)]">
                No artworks are available in this collection right now.
              </p>
            )}
          </div>

          <StorePagination
            currentPage={requestedPage}
            pageCount={pageCount}
            pathname={pathname}
            searchParams={query}
          />

          {isOriginals && (
            <RecommendationList
              products={suggestions}
              title="Suggested Originals"
            />
          )}
        </ContainerSimple>
      </Section>
    </Page>
  );
}
