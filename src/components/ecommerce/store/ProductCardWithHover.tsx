'use client'

import Link from "next/link";
import { ImageWithCaption } from "@/components/_ui/images/imageWithCaption";
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { PriceTag } from "../PriceTag";

export default function ProductCardWithHover({
    product,
    notificationText
}: {
    product: ProductType
    notificationText?: string
}) {

    const hoverImage = product.allImageUrls?.[2] ?? product.coverImageUrl;

    return (
        <Link
            href={`/store/shop/product/${product.slug}`}
            className="block rounded-card bg-surface shadow-card hover:shadow-cardHover transition-shadow"
        >
            <div className="relative rounded-t-card overflow-hidden group">

                {/* Base image */}
                <ImageWithCaption
                    src={product.coverImageUrl}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="transition-opacity duration-500 ease-out group-hover:opacity-0"
                />

                {/* Hover image */}
                <ImageWithCaption
                    src={hoverImage}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                />

            </div>

            <div className="p-space-4 flex flex-col gap-space-3">
                <h2 className="text-title-sm text-text-primary font-semibold line-clamp-2">
                    {product.name}
                </h2>

                <div className="flex justify-between items-center">
                    <PriceTag
                        price={product.price_rupees}
                        previous={product.price_rupees - 1000}
                    />

                    {notificationText && (
                        <span className="text-sm text-secondary">
                            {notificationText.toUpperCase()}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}