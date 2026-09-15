import { describe, expect, it } from "vitest";
import {
  findCategoryBySlug,
  findSubcategoryBySlug,
  getCatalogLabel,
  getCategoryPath,
  getSubcategoryPath,
  type StorefrontCategory,
} from "./categories";

const catalog: StorefrontCategory[] = [
  {
    id: 10,
    name: "Prints",
    printName: "Art Prints",
    slug: "prints",
    isActive: true,
    isFeatured: true,
    subcategories: [
      {
        id: 31,
        categoryId: 10,
        name: "Cityscapes",
        slug: "cityscapes",
        isActive: true,
        isFeatured: false,
      },
    ],
  },
];

describe("storefront catalogue helpers", () => {
  it("uses display names and creates nested canonical paths", () => {
    expect(getCatalogLabel(catalog[0])).toBe("Art Prints");
    expect(getCategoryPath(catalog[0])).toBe("/store/shop/category/prints");
    expect(getSubcategoryPath(catalog[0], catalog[0].subcategories[0])).toBe(
      "/store/shop/category/prints/cityscapes",
    );
  });

  it("resolves categories and legacy flat subcategory slugs without IDs", () => {
    expect(findCategoryBySlug(catalog, "prints")?.id).toBe(10);
    expect(findSubcategoryBySlug(catalog, "cityscapes")).toEqual({
      category: catalog[0],
      subcategory: catalog[0].subcategories[0],
    });
    expect(findSubcategoryBySlug(catalog, "missing")).toBeNull();
  });
});
