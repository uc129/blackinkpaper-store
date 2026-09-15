import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import { FrostedToolbar } from "@/components/_ui/interactive/artwork-controls";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { formatPriceToIntl } from "@/lib/utils";

export function OriginalProductList({
  products,
}: {
  products: ProductSummaryDto[];
}) {
  return (
    <div className="space-y-12">
      {products.map((product, index) => {
        const image =
          product.media.coverImageUrl || product.media.headerImageUrl;
        const href = `/store/shop/product/${product.slug}`;
        const imageFirst = index % 2 === 0;

        return (
          <article key={product.id}>
            <div className="original-product-card min-h-[30rem] overflow-hidden rounded-t-[10px] bg-[var(--paper)]">
              <Link
                href={href}
                className={`relative min-h-80 overflow-hidden bg-[var(--paper-deep)] lg:col-span-5 ${
                  imageFirst ? "lg:order-1" : "lg:order-2"
                }`}
                aria-label={`View ${product.name || "original artwork"}`}
              >
                {image ? (
                  <ImageWithFallback
                    src={image}
                    alt={product.name || "Original artwork"}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    sizes="(min-width: 988px) 62vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
                    No artwork image available
                  </span>
                )}
              </Link>

              <div
                className={`flex flex-col justify-end gap-6 p-6 sm:p-8 lg:col-span-3 ${
                  imageFirst ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {product.productId
                      ? `Accession ${product.productId}`
                      : "Original · One of one"}
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-[var(--ink)] sm:text-4xl">
                    {product.name || "Untitled artwork"}
                  </h2>
                  {product.shortDescription && (
                    <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
                      {product.shortDescription}
                    </p>
                  )}
                </div>
                <dl className="flex gap-4 border-t border-[var(--border)] pt-4 text-sm">
                  <div className="flex-1">
                    <dt className="text-[var(--muted)]">Availability</dt>
                    <dd className="mt-1">Available</dd>
                  </div>
                  <div className="flex-1">
                    <dt className="text-[var(--muted)]">Signed</dt>
                    <dd className="mt-1">
                      {product.isSigned === undefined ||
                      product.isSigned === null
                        ? "See details"
                        : product.isSigned
                          ? "Yes"
                          : "No"}
                    </dd>
                  </div>
                </dl>
                <p className="text-lg font-semibold">
                  {formatPriceToIntl(
                    product.pricing.finalPrice,
                    product.pricing.currencyCode || "INR",
                  )}
                </p>
              </div>
            </div>
            <FrostedToolbar className="rounded-b-[10px]">
              <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                Original work
              </span>
              <Link
                href={href}
                className="ml-auto inline-flex min-h-11 items-center gap-2 px-3 text-sm font-medium underline underline-offset-4"
              >
                Acquire <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </FrostedToolbar>
          </article>
        );
      })}
    </div>
  );
}
