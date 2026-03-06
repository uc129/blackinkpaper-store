import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { ProductCard } from "./ProductCard";
import ProductCardWithHover from "./store/ProductCardWithHover";

export function ProductGrid({ products, hover }: { products: ProductType[], hover?: boolean }) {

    if (hover) {
        return (<div className="grid gap-12">
            {products.map((p) => (
                <div key={p.slug} className="col-12 lg:col-6">
                    <ProductCardWithHover key={p.id} product={p} />
                </div>
            ))}
        </div>);
    }

    else {
        return (
            <div className="grid gap-12">
                {products.map((p) => (
                    <div key={p.slug} className="col-12 lg:col-6">
                        <ProductCard key={p.id} product={p} />
                    </div>
                ))}
            </div>
        );
    }

}
