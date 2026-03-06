import Link from "next/link";
import { PriceTag } from "./PriceTag";
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { ImageWithCaption } from "../_ui/images/imageWithCaption";
import { ProductText } from "./store/ProductText";

export function ProductCard({ product }: { product: ProductType }) {
    return (
        <Link
            href={`/store/shop/product/${product.slug}`}
            className="block rounded-card bg-surface shadow-card hover:shadow-cardHover transition-shadow"
        >
            <div className="relative rounded-t-card overflow-hidden">
                <ImageWithCaption
                    src={product.coverImageUrl}
                    alt={product.name}
                    className=""
                    width={800}
                    height={800}
                />

            </div>

            {/* <div className="p-space-4 flex flex-col gap-space-3">
                <h2 className="text-title-sm text-text-primary font-semibold line-clamp-2">
                    {product.name}
                </h2>

                <PriceTag price={product.price_rupees} previous={product.price_rupees - 1000} />
            </div> */}


            <ProductText
                title={product.name}
                titleClassNames="text-title-sm text-text-primary font-semibold line-clamp-2"
                currentPrice={product.price_rupees}
                oldPrice={product.price_rupees - 1000}
                displayPrice
            />
        </Link>
    );
}
