import { notFound } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { getStorefrontCategory } from "@/lib/api/storefront/categories";
import { storefrontProductService } from "@/lib/api/storefront/services";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getStorefrontCategory(slug);
  if (!category) notFound();

  const productPage = await storefrontProductService
    .getProducts({
      CategoryId: category.categoryId,
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
            <Heading size="title" className="font-display font-bold text-[var(--ink)]">
              {category.label}
            </Heading>
          </div>
          {productPage ? <ProductGrid products={productPage.items} hover /> : <StoreServerError />}
        </ContainerSimple>
      </Section>
    </Page>
  );
}
