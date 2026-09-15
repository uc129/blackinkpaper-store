import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { formatPriceToIntl } from "@/lib/utils";

export function RecommendationList({
  products,
  title = "You may also like",
}: {
  products: ProductSummaryDto[];
  title?: string;
}) {
  if (products.length === 0) return null;

  return (
    <aside
      aria-labelledby="suggested-products"
      className="lg:sticky lg:top-28 lg:self-start"
    >
      <p
        id="suggested-products"
        className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]"
      >
        {title}
      </p>
      <div className="recommendation-list mt-4 gap-3">
        {products.map((product) => {
          const image =
            product.media.coverImageUrl || product.media.headerImageUrl;
          return (
            <Link
              key={product.id}
              href={`/store/shop/product/${product.slug}`}
              className="recommendation-card group items-center gap-3 rounded-[10px] bg-[var(--paper)] p-2 text-[var(--ink)]"
            >
              <div className="relative size-24 overflow-hidden rounded-[10px] bg-[var(--paper-deep)]">
                {image && (
                  <ImageWithFallback
                    src={image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  {formatPriceToIntl(
                    product.pricing.finalPrice,
                    product.pricing.currencyCode || "INR",
                  )}
                </p>
              </div>
              <span className="inline-flex size-11 items-center justify-center rounded-full transition group-hover:bg-[var(--paper-deep)]">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
