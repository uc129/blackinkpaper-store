import { describe, expect, it } from "vitest";
import type { ProductVariantDto } from "@/lib/api/storefront/types";
import {
  createDefaultSelections,
  getSelectedOptions,
  getSelectedStockLimit,
  getSelectedUnitPrice,
  hasCompleteVariantSelection,
  toCartVariantSelections,
} from "./product-selection";

const variants: ProductVariantDto[] = [
  {
    id: 1,
    label: "Size",
    fulfillmentType: 1,
    options: [
      { id: 11, value: "A4", priceModifier: 100, stockQuantity: 0 },
      { id: 12, value: "A3", priceModifier: 250, stockQuantity: 4 },
    ],
  },
  {
    id: 2,
    label: "Format",
    fulfillmentType: 1,
    options: [
      {
        id: 21,
        value: "Fine art print",
        absolutePrice: 2400,
        stockQuantity: 2,
      },
    ],
  },
];

describe("print variant selection", () => {
  it("defaults each group to its first in-stock option", () => {
    expect(createDefaultSelections(variants)).toEqual({ 1: 12, 2: 21 });
  });

  it("builds a complete multi-variant cart payload", () => {
    const selections = getSelectedOptions(variants, { 1: 12, 2: 21 });
    expect(hasCompleteVariantSelection(variants, selections)).toBe(true);
    expect(toCartVariantSelections(selections)).toEqual([
      { productVariantId: 1, productVariantOptionId: 12 },
      { productVariantId: 2, productVariantOptionId: 21 },
    ]);
  });

  it("uses the first absolute price and the lowest tracked stock", () => {
    const selections = getSelectedOptions(variants, { 1: 12, 2: 21 });
    expect(getSelectedUnitPrice(1800, selections)).toBe(2400);
    expect(getSelectedStockLimit(selections)).toBe(2);
  });

  it("adds modifiers when no selected option defines an absolute price", () => {
    const modifierOnly = getSelectedOptions([variants[0]], { 1: 12 });
    expect(getSelectedUnitPrice(1800, modifierOnly)).toBe(2050);
  });
});
