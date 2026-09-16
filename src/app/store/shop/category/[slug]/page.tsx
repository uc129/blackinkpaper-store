import { notFound, redirect } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import { RecommendationList } from "@/components/ecommerce/store/RecommendationList";
import { StoreCategoryMenu } from "@/components/ecommerce/store/StoreCategoryMenu";
import { StorePagination } from "@/components/ecommerce/store/StorePagination";
import { OriginalsCollectionView } from "@/features/storefront/originals/OriginalsCollectionView";
import {
  findCategoryBySlug,
  findSubcategoryBySlug,
  getCatalogLabel,
  getStorefrontCatalog,
  getSubcategoryPath,
} from "@/lib/api/storefront/categories";
import { getProductSuggestions } from "@/lib/api/storefront/recommendations";
import { storefrontProductService } from "@/lib/api/storefront/services";
import {
  buildPaginatedPath,
  getPageCount,
  parsePageParam,
} from "@/lib/storefront/pagination";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const pathname = `/store/shop/category/${slug}`;
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
  if (!category) {
    const legacySubcategory = findSubcategoryBySlug(catalog, slug);
    if (legacySubcategory) {
      redirect(
        getSubcategoryPath(
          legacySubcategory.category,
          legacySubcategory.subcategory,
        ),
      );
    }
    notFound();
  }

  const isOriginals = slug === "originals";
  const pageSize = isOriginals ? 4 : 8;
  const productPage = await storefrontProductService
    .getProducts({
      CategorySlug: slug,
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
    query: { CategorySlug: slug },
    excludedIds: new Set(productPage.items.map((product) => product.id)),
    limit: isOriginals ? 3 : 4,
  });

  if (isOriginals) {
    return (
      <Page className="storefront-editorial-page storefront-originals-page">
        <OriginalsCollectionView
          catalog={catalog}
          products={productPage.items}
          suggestions={suggestions}
          totalCount={productPage.totalCount}
          currentPage={requestedPage}
          pageCount={pageCount}
          pathname={pathname}
          searchParams={query}
        />
      </Page>
    );
  }

  return (
    <Page>
      <Section className="mx-auto">
        <ContainerSimple className="gap-12 lg:gap-16">
          <div className="text-center">
            <Heading
              size="title"
              className="font-display font-bold text-[var(--ink)]"
            >
              {getCatalogLabel(category)}
            </Heading>
            {category.description && (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
                {category.description}
              </p>
            )}
          </div>

          <StoreCategoryMenu catalog={catalog} activeCategorySlug={slug} />

          <div id="products" className="scroll-mt-28">
            {productPage.items.length > 0 ? (
              <div className="store-catalog-layout gap-10">
                <ProductGrid products={productPage.items} hover />
                <RecommendationList products={suggestions} />
              </div>
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
        </ContainerSimple>
      </Section>
    </Page>
  );
}
