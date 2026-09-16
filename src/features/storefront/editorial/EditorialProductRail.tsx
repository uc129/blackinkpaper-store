import Link from "next/link";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { formatPriceToIntl } from "@/lib/utils";

type EditorialProductRailProps = {
  products: ProductSummaryDto[];
  eyebrow: string;
  title: string;
  linkLabel: string;
  linkHref: string;
};

export function EditorialProductRail({
  products,
  eyebrow,
  title,
  linkLabel,
  linkHref,
}: EditorialProductRailProps) {
  if (products.length === 0) return null;
  const headingId = `${eyebrow.toLowerCase().replaceAll(" ", "-")}-title`;

  return (
    <section className="editorial-product-rail" aria-labelledby={headingId}>
      <header className="editorial-product-rail__header">
        <div>
          <p>{eyebrow}</p>
          <h2 id={headingId}>{title}</h2>
        </div>
        <Link href={linkHref}>{linkLabel}</Link>
      </header>
      <div className="editorial-product-rail__grid">
        {products.map((product, index) => {
          const image =
            product.media.coverImageUrl || product.media.headerImageUrl;
          const href = `/store/shop/product/${product.slug}`;

          return (
            <Link
              href={href}
              key={product.id}
              className="editorial-product-tile storefront-reveal"
            >
              <span className="editorial-product-tile__media">
                {image ? (
                  <ImageWithFallback
                    src={image}
                    alt={product.name || "Artwork"}
                    fill
                    sizes="(min-width: 988px) 33vw, (min-width: 640px) 50vw, 100vw"
                    loading={index < 3 ? "eager" : "lazy"}
                    className="editorial-product-tile__image"
                  />
                ) : (
                  <span className="editorial-artwork-card__empty">
                    Artwork image unavailable
                  </span>
                )}
              </span>
              <span className="editorial-product-tile__name">
                {product.name || "Untitled artwork"}
                <span>
                  ·{" "}
                  {formatPriceToIntl(
                    product.pricing.finalPrice,
                    product.pricing.currencyCode || "INR",
                  )}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
