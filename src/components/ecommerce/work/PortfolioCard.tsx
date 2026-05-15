import Link from "next/link";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";

type Props = {
  product: ProductSummaryDto;
  priority?: boolean;
};

export default function PortfolioCard({ product, priority = false }: Props) {
  const image = product.media.coverImageUrl || product.media.headerImageUrl || null;

  return (
    <Link href={`/works/${product.slug}`} className="group block text-[var(--ink)]">
      <article className="flex flex-col gap-5">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-deep)]">
          {image ? (
            <ImageWithFallback
              src={image}
              alt={product.name || "Portfolio artwork"}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              sizes="(min-width: 1348px) 33vw, (min-width: 988px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
              No image from server
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
          <h2 className="font-display text-2xl font-bold leading-tight">{product.name || "Untitled work"}</h2>
          <span className="shrink-0 text-sm uppercase tracking-[0.16em] text-[var(--muted)]">View</span>
        </div>
      </article>
    </Link>
  );
}
