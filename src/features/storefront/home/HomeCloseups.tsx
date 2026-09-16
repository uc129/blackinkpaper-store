import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { EditorialSectionHeader } from "../editorial/EditorialSectionHeader";

export function HomeCloseups({ products }: { products: ProductSummaryDto[] }) {
  const closeups = products
    .filter(
      (product) => product.media.coverImageUrl || product.media.headerImageUrl,
    )
    .slice(0, 3);

  if (closeups.length === 0) return null;

  return (
    <section className="home-closeups" aria-labelledby="closeups-title">
      <EditorialSectionHeader title="Close up" meta="Linework at 100%" />
      <div className="home-closeups__grid">
        {closeups.map((product) => {
          const image =
            product.media.coverImageUrl || product.media.headerImageUrl;
          return (
            <figure key={product.id} className="storefront-reveal">
              <span className="home-closeups__media">
                {image && (
                  <ImageWithFallback
                    src={image}
                    alt={`Close detail of ${product.name || "artwork"}`}
                    fill
                    sizes="(min-width: 988px) 33vw, 100vw"
                    className="home-closeups__image"
                  />
                )}
              </span>
              <figcaption>{product.name || "Artwork"} · detail</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
