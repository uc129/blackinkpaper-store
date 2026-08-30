import { describe, expect, it } from "vitest";
import type { CartItemDto } from "@/lib/api/storefront/types";
import {
  clampCartItemQuantity,
  getCartItemQuantityLimit,
  isCartItemQuantityInvalid,
  isCartItemUnavailable,
} from "./availability";

const baseItem: CartItemDto = {
  id: 1,
  productDbId: 10,
  basePrice: 100,
  unitPrice: 100,
  quantity: 1,
  lineTotal: 100,
  selectedVariants: [],
};

describe("cart availability", () => {
  it("locks Originals to a single item", () => {
    const original = { ...baseItem, isOriginal: true };
    expect(getCartItemQuantityLimit(original)).toBe(1);
    expect(clampCartItemQuantity(original, 4)).toBe(1);
  });

  it("uses the backend-provided available stock for Prints", () => {
    const print = { ...baseItem, quantity: 4, availableStockQuantity: 2 };
    expect(isCartItemQuantityInvalid(print)).toBe(true);
    expect(clampCartItemQuantity(print, 3)).toBe(2);
  });

  it("recognizes explicit and stock-based unavailable states", () => {
    expect(isCartItemUnavailable({ ...baseItem, isAvailable: false })).toBe(
      true,
    );
    expect(
      isCartItemUnavailable({ ...baseItem, availableStockQuantity: 0 }),
    ).toBe(true);
    expect(isCartItemUnavailable(baseItem)).toBe(false);
  });
});
