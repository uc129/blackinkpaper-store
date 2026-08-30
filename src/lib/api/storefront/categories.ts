import { storefrontCatalogService } from "./services";
import type {
  ProductCategoryLookupDto,
  ProductSubCategoryLookupDto,
} from "./types";

export type StorefrontCategory = ProductCategoryLookupDto & {
  subcategories: ProductSubCategoryLookupDto[];
};

export function getCatalogLabel(
  item: ProductCategoryLookupDto | ProductSubCategoryLookupDto,
) {
  return (
    item.printName ||
    item.name ||
    item.nameCode ||
    item.slug ||
    "Untitled collection"
  );
}

export function getCategoryPath(category: ProductCategoryLookupDto) {
  return category.slug ? `/store/shop/category/${category.slug}` : "/store";
}

export function getSubcategoryPath(
  category: ProductCategoryLookupDto,
  subcategory: ProductSubCategoryLookupDto,
) {
  return category.slug && subcategory.slug
    ? `/store/shop/category/${category.slug}/${subcategory.slug}`
    : getCategoryPath(category);
}

export async function getStorefrontCatalog(): Promise<StorefrontCategory[]> {
  const categories = (await storefrontCatalogService.getCategories()).filter(
    (category) => category.isActive && category.slug,
  );
  const subcategoryLists = await Promise.all(
    categories.map((category) =>
      storefrontCatalogService.getSubcategories(category.id),
    ),
  );

  return categories.map((category, index) => ({
    ...category,
    subcategories: subcategoryLists[index].filter(
      (subcategory) => subcategory.isActive && subcategory.slug,
    ),
  }));
}

export function findCategoryBySlug(
  catalog: StorefrontCategory[],
  slug: string,
) {
  return catalog.find((category) => category.slug === slug);
}

export function findSubcategoryBySlug(
  catalog: StorefrontCategory[],
  slug: string,
) {
  for (const category of catalog) {
    const subcategory = category.subcategories.find(
      (item) => item.slug === slug,
    );
    if (subcategory) return { category, subcategory };
  }

  return null;
}
