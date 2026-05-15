import type { CartItemDto, CartResponseDto } from "@/lib/api/storefront/types";

export function getAdjustedCartItemUnitPrice(item: CartItemDto) {
  const absoluteVariantPrice = item.selectedVariants.find(
    (variant) => typeof variant.absolutePrice === "number",
  )?.absolutePrice;

  if (typeof absoluteVariantPrice === "number") {
    return absoluteVariantPrice;
  }

  return item.basePrice + item.selectedVariants.reduce(
    (total, variant) => total + (variant.priceModifier ?? 0),
    0,
  );
}

export function getAdjustedCartItemLineTotal(item: CartItemDto) {
  return getAdjustedCartItemUnitPrice(item) * item.quantity;
}

export function getAdjustedCartSubtotal(cart: CartResponseDto | null) {
  return cart?.items.reduce((total, item) => total + getAdjustedCartItemLineTotal(item), 0) ?? 0;
}
