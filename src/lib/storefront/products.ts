import type { ProductSummaryDto } from "@/lib/api/storefront/types";

const FORMAT_SUFFIX_PATTERN = /-(?:original|print)s?$/;

function normalizeIdentity(value: string | null | undefined) {
  const normalized = value?.trim().toLowerCase();
  return normalized || null;
}

function getArtworkIdentityKeys(product: ProductSummaryDto) {
  const artworkId = normalizeIdentity(product.artworkId);
  if (artworkId) return [`artwork:${artworkId}`];

  const identityKeys: string[] = [];
  const productId = normalizeIdentity(product.productId);
  const slug = normalizeIdentity(product.slug)?.replace(
    FORMAT_SUFFIX_PATTERN,
    "",
  );

  if (productId) identityKeys.push(`catalogue:${productId}`);
  if (slug) identityKeys.push(`slug:${slug}`);

  return identityKeys.length > 0 ? identityKeys : [`product:${product.id}`];
}

function filterDistinctArtworks(
  products: ProductSummaryDto[],
  previouslyVisible: ProductSummaryDto[] = [],
) {
  const identities = new Set(previouslyVisible.flatMap(getArtworkIdentityKeys));

  return products.filter((product) => {
    const productIdentities = getArtworkIdentityKeys(product);
    if (productIdentities.some((identity) => identities.has(identity))) {
      return false;
    }

    for (const identity of productIdentities) identities.add(identity);
    return true;
  });
}

export function distinctArtworks(products: ProductSummaryDto[]) {
  return filterDistinctArtworks(products);
}

export function distributeDistinctArtworks(
  ...productGroups: ProductSummaryDto[][]
) {
  const selectedGroups = productGroups.map(() => [] as ProductSummaryDto[]);
  const groupIndexes = productGroups.map(() => 0);
  const identities = new Set<string>();
  let selectedProduct = true;

  while (selectedProduct) {
    selectedProduct = false;

    productGroups.forEach((products, groupIndex) => {
      while (groupIndexes[groupIndex] < products.length) {
        const product = products[groupIndexes[groupIndex]];
        groupIndexes[groupIndex] += 1;
        const productIdentities = getArtworkIdentityKeys(product);

        if (productIdentities.some((identity) => identities.has(identity))) {
          continue;
        }

        for (const identity of productIdentities) identities.add(identity);
        selectedGroups[groupIndex].push(product);
        selectedProduct = true;
        break;
      }
    });
  }

  return selectedGroups;
}

export function excludeProducts(
  products: ProductSummaryDto[],
  excludedIds: ReadonlySet<number>,
) {
  return distinctArtworks(
    products.filter((product) => !excludedIds.has(product.id)),
  );
}
