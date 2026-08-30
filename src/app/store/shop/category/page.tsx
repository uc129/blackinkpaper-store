import CardSimple from "@/components/_ui/cards/card-simple";
import Page from "@/components/_ui/containers/base/page";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import {
  getCatalogLabel,
  getCategoryPath,
  getStorefrontCatalog,
} from "@/lib/api/storefront/categories";

export const dynamic = "force-dynamic";

export default async function CategoryListPage() {
  const catalog = await getStorefrontCatalog().catch(() => null);

  return (
    <Page>
      <ContainerSimple className="gap-10">
        <Heading size="title" className="text-center">
          Categories
        </Heading>
        {catalog ? (
          catalog.length > 0 ? (
            <div className="grid gap-6">
              {catalog.map((category) => (
                <div key={category.id} className="col-12 lg:col-6">
                  <CardSimple
                    linkHref={getCategoryPath(category)}
                    imageSrc={category.coverImageUrl}
                    title={getCatalogLabel(category)}
                    description={category.description || undefined}
                    showDescription
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-[var(--ink-soft)]">
              No collections are available right now.
            </p>
          )
        ) : (
          <StoreServerError message="Collections could not load because the store server is unavailable." />
        )}
      </ContainerSimple>
    </Page>
  );
}
