import { excludeProducts } from "@/lib/storefront/products";
import { storefrontProductService } from "./services";
import type { ProductListQuery, ProductSummaryDto } from "./types";

export async function getProductSuggestions({
  query,
  excludedIds,
  limit,
}: {
  query: ProductListQuery;
  excludedIds: ReadonlySet<number>;
  limit: number;
}): Promise<ProductSummaryDto[]> {
  const featuredPage = await storefrontProductService
    .getProducts({
      ...query,
      IsAvailable: true,
      IsFeatured: true,
      Page: 1,
      PageSize: Math.max(limit * 3, 12),
    })
    .catch(() => null);
  let suggestions = excludeProducts(featuredPage?.items ?? [], excludedIds);

  if (suggestions.length < limit) {
    const availablePage = await storefrontProductService
      .getProducts({
        ...query,
        IsAvailable: true,
        Page: 1,
        PageSize: Math.max(limit * 4, 16),
      })
      .catch(() => null);
    const combined = [...suggestions, ...(availablePage?.items ?? [])];
    suggestions = excludeProducts(combined, excludedIds);
  }

  return suggestions.slice(0, limit);
}
