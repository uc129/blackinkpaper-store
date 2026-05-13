import Page from "@/components/_ui/containers/base/page";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import CardSimple from "@/components/_ui/cards/card-simple";
import { storefrontCategories } from "@/lib/api/storefront/categories";
import { storefrontProductService } from "@/lib/api/storefront/services";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";

export const dynamic = "force-dynamic";

function getCategoryCoverImage(products: ProductSummaryDto[], categoryId: number) {
  const categoryProduct = products.find(
    (product) =>
      product.taxonomy.categoryId === categoryId &&
      (product.media.coverImageUrl || product.media.headerImageUrl),
  );
  return categoryProduct?.media.coverImageUrl || categoryProduct?.media.headerImageUrl || null;
}

export default async function CategoryListPage() {
  const productPage = await storefrontProductService
    .getProducts({
      IsAvailable: true,
      Page: 1,
      PageSize: 48,
    })
    .catch(() => null);
  const products = productPage?.items ?? [];

  return (
    <Page>
      <ContainerSimple className="gap-10">
        <Heading size="title" className="text-center">
          Categories
        </Heading>
        <div className="grid gap-6">
          {storefrontCategories.map((category) => (
            <div key={category.slug} className="col-12 lg:col-6 2xl:col-4">
              <CardSimple
                linkHref={`/store/shop/category/${category.slug}`}
                imageSrc={getCategoryCoverImage(products, category.categoryId)}
                title={category.label}
                showTitle
              />
            </div>
          ))}
        </div>
      </ContainerSimple>
    </Page>
  );
}
