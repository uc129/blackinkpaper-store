import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import ProductCardWithHover from "./store/ProductCardWithHover";

export function ProductGrid({ products }: { products: ProductSummaryDto[]; hover?: boolean }) {

        return (<div className="grid gap-x-8 gap-y-14">
            {products.map((p, index) => (
                <div key={p.slug} className="col-12 lg:col-6 2xl:col-4">
                    <ProductCardWithHover key={p.id} product={p} priority={index === 0} />
                </div>
            ))}
        </div>);

}
