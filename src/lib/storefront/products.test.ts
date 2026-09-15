import { describe, expect, it } from "vitest";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { distinctArtworks, distributeDistinctArtworks } from "./products";

function product(
  id: number,
  artworkId?: string,
  productId?: string,
  slug = `artwork-${id}`,
): ProductSummaryDto {
  return {
    id,
    artworkId,
    productId,
    name: `Artwork ${id}`,
    slug,
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

  it("recognizes original and print slugs when artwork identity is absent", () => {
    expect(
      distinctArtworks([
        product(1, undefined, "original-1", "domed-monument"),
        product(2, undefined, "print-1", "domed-monument-print"),
        product(3, undefined, "print-2", "blue-relief-print"),
      ]).map(({ id }) => id),
    ).toEqual([1, 3]);
  });

  it("distributes overlapping artwork between product groups", () => {
    const originals = [
      product(1, undefined, "original-1", "domed-monument"),
      product(2, undefined, "original-2", "apsara"),
      product(3, undefined, "original-3", "blue-relief"),
      product(4, undefined, "original-4", "ganesha-stele"),
    ];
    const prints = [
      product(11, undefined, "print-1", "domed-monument-print"),
      product(12, undefined, "print-2", "apsara-print"),
      product(13, undefined, "print-3", "blue-relief-print"),
      product(14, undefined, "print-4", "ganesha-stele-print"),
    ];

    const [selectedOriginals, selectedPrints] = distributeDistinctArtworks(
      originals,
      prints,
    );

    expect(selectedOriginals.map(({ id }) => id)).toEqual([1, 3]);
    expect(selectedPrints.map(({ id }) => id)).toEqual([12, 14]);
  });
});
