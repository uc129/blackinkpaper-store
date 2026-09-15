import { describe, expect, it } from "vitest";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { distinctArtworks } from "./products";

function product(
  id: number,
  artworkId?: string,
  productId?: string,
): ProductSummaryDto {
  return {
    id,
    artworkId,
    productId,
    name: `Artwork ${id}`,
    slug: `artwork-${id}`,
    artistId: 1,
    pricing: { basePrice: 100, finalPrice: 100, currencyCode: "INR" },
    taxonomy: {
      categoryId: 1,
      subCategoryId: 1,
      isFeatured: false,
      isAvailable: true,
    },
    media: {},
    stats: { averageRating: 0, reviewCount: 0 },
    isUsingStandardVariants: false,
    isOriginal: false,
  };
}

describe("distinctArtworks", () => {
  it("prefers artwork identity and preserves the first product", () => {
    expect(
      distinctArtworks([
        product(1, "drawing-1", "print-a"),
        product(2, "drawing-1", "print-b"),
        product(3, "drawing-2", "print-c"),
      ]).map(({ id }) => id),
    ).toEqual([1, 3]);
  });

  it("uses stable product identity when artwork identity is absent", () => {
    expect(
      distinctArtworks([
        product(1, undefined, "catalogue-1"),
        product(2, undefined, "catalogue-1"),
      ]).map(({ id }) => id),
    ).toEqual([1]);
  });
});
