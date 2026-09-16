import Link from "next/link";
import { StoreCategoryMenu } from "@/components/ecommerce/store/StoreCategoryMenu";
import { StorePagination } from "@/components/ecommerce/store/StorePagination";
import type { StorefrontCategory } from "@/lib/api/storefront/categories";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { EditorialArtworkGrid } from "../editorial/EditorialArtworkGrid";
import { EditorialProductRail } from "../editorial/EditorialProductRail";

type OriginalsCollectionViewProps = {
  catalog: StorefrontCategory[];
  products: ProductSummaryDto[];
  suggestions: ProductSummaryDto[];
  totalCount: number;
  currentPage: number;
  pageCount: number;
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
};

const assurances = [
  ["Edition", "One drawing, one owner"],
  ["Provenance", "Artwork details documented"],
  ["Delivery", "Protected and tracked"],
] as const;

export function OriginalsCollectionView({
  catalog,
  products,
  suggestions,
  totalCount,
  currentPage,
  pageCount,
  pathname,
  searchParams,
}: OriginalsCollectionViewProps) {
  return (
    <div className="originals-collection">
      <header className="originals-collection__header">
        <div className="originals-collection__intro">
          <div>
            <p>Accessioned works · BIP-RM-ORG</p>
            <h1>Originals</h1>
          </div>
          <div>
            <p>
              One-of-a-kind original artworks — a single available piece per
              artwork.
            </p>
            <Link
              href="/contact"
              className="editorial-pill editorial-pill--solid"
            >
              Commission a work
            </Link>
          </div>
        </div>

        <div className="originals-collection__controls">
          <StoreCategoryMenu
            catalog={catalog}
            activeCategorySlug="originals"
            variant="editorial"
          />
          <div>
            <span>{totalCount} currently available</span>
            <span aria-hidden="true" />
            <span>Newest first</span>
          </div>
        </div>
      </header>

      <section
        id="products"
        className="originals-collection__products scroll-mt-28"
      >
        {products.length > 0 ? (
          <EditorialArtworkGrid products={products} context="collection" />
        ) : (
          <p className="originals-collection__empty">
            No original artworks are available right now.
          </p>
        )}
      </section>

      <StorePagination
        currentPage={currentPage}
        pageCount={pageCount}
        pathname={pathname}
        searchParams={searchParams}
        variant="editorial"
      />

      <section
        className="originals-assurances"
        aria-label="Original artwork assurances"
      >
        {assurances.map(([label, value]) => (
          <div key={label}>
            <p>{label}</p>
            <span>{value}</span>
          </div>
        ))}
      </section>

      <EditorialProductRail
        products={suggestions}
        eyebrow="Suggested originals"
        title="Also on paper this season"
        linkLabel="All originals"
        linkHref="/store/shop/category/originals"
      />
    </div>
  );
}
