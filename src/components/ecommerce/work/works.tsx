
import CardSimple from "../../_ui/cards/card-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { storefrontCategories } from "@/lib/api/storefront/categories";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";

function getCategoryCoverImage(products: ProductSummaryDto[], categoryId: number) {
    const categoryProduct = products.find(
        (product) =>
            product.taxonomy.categoryId === categoryId &&
            (product.media.coverImageUrl || product.media.headerImageUrl),
    );
    return categoryProduct?.media.coverImageUrl || categoryProduct?.media.headerImageUrl || null;
}

export default function WorkProjectsGrid({ products = [] }: { products?: ProductSummaryDto[] }) {
    return (
        <ContainerSimple className="gap-16">
            <Heading size="title" className="font-display text-center text-[var(--ink)]">My Works</Heading>
            <div className="mx-auto grid gap-x-12 gap-y-20 items-center align-center w-full">
                {storefrontCategories.map(cat => (
                    <div key={cat.slug} className="col-12 lg:col-6">
                        <CardSimple
                            linkHref={`/store/shop/category/${cat.slug}`}
                            imageSrc={getCategoryCoverImage(products, cat.categoryId)}
                            title={cat.label}
                            showTitle
                        ></CardSimple>
                    </div>
                ))}
            </div>
        </ContainerSimple>
    )

}
