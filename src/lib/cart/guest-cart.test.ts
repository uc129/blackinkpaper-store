import { describe, expect, it } from "vitest";
import type { ProductResponseDto } from "@/lib/api/storefront/types";
import { getSelectedOptions } from "@/lib/products/product-selection";
import {
  addGuestCartItem,
  removeGuestCartItem,
  updateGuestCartQuantity,
} from "./guest-cart";

const product: ProductResponseDto = {
  id: 42,
  productId: "print-42",
  name: "Blue Relief",
  slug: "blue-relief-print",
  artistId: 1,
  pricing: { basePrice: 1000, finalPrice: 1000, currencyCode: "INR" },
  taxonomy: {
    categoryId: 1,
    subCategoryId: 2,
    isFeatured: false,
    isAvailable: true,
  },
  media: { coverImageUrl: "/blue-relief.jpeg" },
  stats: { averageRating: 0, reviewCount: 0, stockQuantity: 4 },
  isUsingStandardVariants: false,
  selectionMode: "single-configuration",
  content: {},
  tags: [],
  images: [],
  variants: [
    {
      id: 7,
      label: "Print size",
      fulfillmentType: 1,
      options: [
        {
          id: 70,
          value: "A3",
          absolutePrice: 1500,
          stockQuantity: 4,
        },
      ],
    },
  ],
};

const selections = getSelectedOptions(product.variants, { 7: 70 });

describe("guest cart", () => {
  it("adds matching configurations as one line and recalculates totals", () => {
    const firstCart = addGuestCartItem(null, {
      product,
      quantity: 1,
      selections,
    });
    const secondCart = addGuestCartItem(firstCart, {
      product,
      quantity: 2,
      selections,
    });

    expect(secondCart.items).toHaveLength(1);
    expect(secondCart.items[0]).toMatchObject({ quantity: 3, lineTotal: 4500 });
    expect(secondCart).toMatchObject({ itemCount: 3, subtotal: 4500 });
  });

  it("updates and removes guest lines", () => {
    const cart = addGuestCartItem(null, { product, quantity: 1, selections });
    const itemId = cart.items[0].id;
    const updated = updateGuestCartQuantity(cart, itemId, 2);
    const emptied = removeGuestCartItem(updated, itemId);

    expect(updated).toMatchObject({ itemCount: 2, subtotal: 3000 });
    expect(emptied).toMatchObject({ itemCount: 0, subtotal: 0, items: [] });
  });
});
