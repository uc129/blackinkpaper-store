import type { CartItemDto, CartResponseDto } from "@/lib/api/storefront/types";

export function getCartItemQuantityLimit(item: CartItemDto) {
  if (item.isOriginal) return 1;
  return typeof item.availableStockQuantity === "number"
    ? item.availableStockQuantity
    : null;
}

export function isCartItemUnavailable(item: CartItemDto) {
  return item.isAvailable === false || item.availableStockQuantity === 0;
}

export function isCartItemQuantityInvalid(item: CartItemDto) {
  const limit = getCartItemQuantityLimit(item);
  return limit !== null && item.quantity > limit;
}

export function cartHasAvailabilityIssues(cart: CartResponseDto | null) {
  return (
    cart?.items.some(
      (item) => isCartItemUnavailable(item) || isCartItemQuantityInvalid(item),
    ) ?? false
  );
}

export function clampCartItemQuantity(
  item: CartItemDto,
  requestedQuantity: number,
) {
  const limit = getCartItemQuantityLimit(item);
  const positiveQuantity = Math.max(1, requestedQuantity);
  return limit === null ? positiveQuantity : Math.min(limit, positiveQuantity);
}
