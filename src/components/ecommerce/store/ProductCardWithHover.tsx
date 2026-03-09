"use client";

import Link from "next/link";
import { ImageWithCaption } from "@/components/_ui/images/imageWithCaption";
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { PriceTag } from "../PriceTag";

export default function ProductCardWithHover({
  product,
  notificationText,
}: {
  product: ProductType;
  notificationText?: string;
}) {
  const hoverImage = product.allImageUrls?.[2] ?? product.coverImageUrl;

  return (
    <Link
      href={`/store/shop/product/${product.slug}`}
      className="block rounded-card bg-surface shadow-card hover:shadow-cardHover transition-shadow"
    >
      <div className="relative group h-[40vh] min-h-100 w-full overflow-hidden">
        {/* Base Image */}
        <ImageWithCaption
          src={product.coverImageUrl}
          fill
          alt={product.name}
          className="object-cover transition-opacity duration-500 group-hover:opacity-0 h-full w-full"
        />
        {/* Hover Image */}
        <ImageWithCaption
          src={hoverImage}
          fill
          alt={`${product.name} hover view`}
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
            currencyCode="INR"
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
