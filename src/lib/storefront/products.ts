import type { ProductSummaryDto } from "@/lib/api/storefront/types";

function getArtworkIdentity(product: ProductSummaryDto) {
  return product.artworkId || product.productId || `product:${product.id}`;
}

export function distinctArtworks(products: ProductSummaryDto[]) {
  const identities = new Set<string>();

  return products.filter((product) => {
    const identity = getArtworkIdentity(product);
    if (identities.has(identity)) return false;
    identities.add(identity);
    return true;
  });
}

export function excludeProducts(
  products: ProductSummaryDto[],
  excludedIds: ReadonlySet<number>,
) {
  return distinctArtworks(
    products.filter((product) => !excludedIds.has(product.id)),
  );
}
