import Link from "next/link";
import { ImageWithCaption } from "../_ui/images/imageWithCaption";
import { ProductText } from "./store/ProductText";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";

export function ProductCard({ product }: { product: ProductSummaryDto }) {
    const imageUrl = product.media.coverImageUrl || product.media.headerImageUrl || null;
    return (
        <Link
            href={`/store/shop/product/${product.slug}`}
            className="product-card-link group block"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-deep)]">
                {imageUrl ? (
                    <ImageWithCaption
                        src={imageUrl}
                        alt={product.name || "Product artwork"}
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        fill
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
                        No image from server
                    </div>
                )}

            </div>

            {/* <div className="p-space-4 flex flex-col gap-space-3">
                <h2 className="text-title-sm text-text-primary font-semibold line-clamp-2">
                    {product.name}
                </h2>

                <PriceTag price={product.price_rupees} previous={product.price_rupees - 1000} />
            </div> */}


            <ProductText
                title={product.name || "Artwork"}
                titleClassNames="font-display text-[var(--ink)] font-semibold line-clamp-2"
                currentPrice={product.pricing.finalPrice}
                oldPrice={product.pricing.basePrice === product.pricing.finalPrice ? undefined : product.pricing.basePrice}
                currencyCode={product.pricing.currencyCode || "INR"}
                displayPrice
            />
        </Link>
    );
}
