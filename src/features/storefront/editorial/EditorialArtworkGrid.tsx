import Link from "next/link";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { formatPriceToIntl } from "@/lib/utils";

type EditorialArtworkGridProps = {
  products: ProductSummaryDto[];
  context?: "home" | "collection";
};

function getProductImage(product: ProductSummaryDto) {
  return product.media.coverImageUrl || product.media.headerImageUrl || null;
}

function getAvailability(product: ProductSummaryDto) {
  return product.stats.stockQuantity === 0 ? "Sold" : "Available";
}

export function EditorialArtworkGrid({
  products,
  context = "home",
}: EditorialArtworkGridProps) {
  return (
    <div
      className={`editorial-artwork-grid editorial-artwork-grid--${context}`}
    >
      {products.slice(0, 4).map((product, index) => {
        const image = getProductImage(product);
        const href = `/store/shop/product/${product.slug}`;
        const isAvailable = product.stats.stockQuantity !== 0;

        return (
          <article
            key={product.id}
            className="editorial-artwork-card storefront-reveal"
          >
            <Link
              href={href}
              className="editorial-artwork-card__media group"
              aria-label={`View ${product.name || "original artwork"}`}
            >
              {image ? (
                <>
                  <ImageWithFallback
                    src={image}
                    alt={product.name || "Original artwork"}
                    fill
                    preload={context === "collection" && index === 0}
                    loading={
                      context === "collection" && index === 0
                        ? undefined
                        : index === 0
                          ? "eager"
                          : "lazy"
                    }
                    fetchPriority={index === 0 ? "high" : "auto"}
                    sizes="(min-width: 988px) 48vw, 100vw"
                    className="editorial-artwork-card__image"
                  />
                  <span
                    className="editorial-artwork-card__detail"
                    aria-hidden="true"
                  >
                    <ImageWithFallback
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 988px) 48vw, 100vw"
                      className="editorial-artwork-card__detail-image"
                    />
                    <span className="editorial-artwork-card__detail-label">
                      Detail
                    </span>
                  </span>
                </>
              ) : (
                <span className="editorial-artwork-card__empty">
                  Artwork image unavailable
                </span>
              )}

              {context === "collection" && (
                <span className="editorial-artwork-card__accession">
                  {product.productId || `BIP-ORIGINAL-${product.id}`}
                </span>
              )}
            </Link>

            <div className="editorial-artwork-card__caption">
              <div>
                <h2>{product.name || "Untitled artwork"}</h2>
                <p>
                  {context === "collection"
                    ? `Original work${product.isSigned ? " · Signed" : ""}`
                    : "Original work · One of one"}
                </p>
              </div>
              <div className="editorial-artwork-card__price">
                <p>
                  {formatPriceToIntl(
                    product.pricing.finalPrice,
                    product.pricing.currencyCode || "INR",
                  )}
                </p>
                {context === "home" ? (
                  <span data-available={isAvailable}>
                    {getAvailability(product)}
                  </span>
                ) : (
                  <Link href={href}>See details</Link>
                )}
              </div>
            </div>

            {context === "collection" && (
              <div className="editorial-artwork-card__action">
                <span data-available={isAvailable}>
                  {getAvailability(product)}
                </span>
                <Link
                  href={href}
                  className="editorial-pill editorial-pill--outline"
                >
                  Acquire
                </Link>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
