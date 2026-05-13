"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { PriceTag } from "../PriceTag";

export default function ProductCardWithHover({
  product,
  notificationText,
  priority = false,
}: {
  product: ProductSummaryDto;
  notificationText?: string;
  priority?: boolean;
}) {
  const coverImage = product.media.coverImageUrl || product.media.headerImageUrl || null;
  const hoverImage = product.media.headerImageUrl || coverImage;
  const hasHoverImage = Boolean(coverImage && hoverImage && hoverImage !== coverImage);
  const hoverImageSrc = hasHoverImage ? hoverImage : null;

  return (
    <Link
      href={`/store/shop/product/${product.slug}`}
      className="product-card-link group block"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--paper-deep)]">
        {coverImage ? (
          <>
            <ImageWithFallback
              src={coverImage}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              sizes="(min-width: 1348px) 33vw, (min-width: 988px) 50vw, 100vw"
              alt={product.name || "Product artwork"}
              className={`object-cover transition duration-500 group-hover:scale-[1.02] ${hasHoverImage ? "group-hover:opacity-0" : ""}`}
            />
            {hoverImageSrc && (
              <ImageWithFallback
                src={hoverImageSrc}
                fill
                sizes="(min-width: 1348px) 33vw, (min-width: 988px) 50vw, 100vw"
                alt={`${product.name || "Product"} hover view`}
                className="object-cover opacity-0 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
            No image from server
          </div>
        )}
      </div>

      <div className="pt-5 flex flex-col gap-3">
        <h2 className="font-display text-2xl font-bold leading-tight text-[var(--ink)] line-clamp-2">
          {product.name}
        </h2>

        <div className="flex justify-between items-center">
          <PriceTag
            previous={product.pricing.basePrice === product.pricing.finalPrice ? undefined : product.pricing.basePrice}
            price={product.pricing.finalPrice}
            currencyCode={product.pricing.currencyCode || "INR"}
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
