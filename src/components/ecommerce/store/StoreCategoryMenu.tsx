import Link from "next/link";
import {
  getCatalogLabel,
  getCategoryPath,
  getSubcategoryPath,
  type StorefrontCategory,
} from "@/lib/api/storefront/categories";

export function StoreCategoryMenu({
  catalog,
  activeCategorySlug,
}: {
  catalog: StorefrontCategory[];
  activeCategorySlug?: string;
}) {
  return (
    <nav
      aria-label="Store collections"
      className="mx-auto flex flex-wrap justify-center gap-2 border-b border-[var(--border)] pb-4"
    >
      {catalog.map((category) => {
        const active = category.slug === activeCategorySlug;

        return (
          <Link
            key={category.id}
            href={getCategoryPath(category)}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)]"
            }`}
          >
            {getCatalogLabel(category)}
          </Link>
        );
      })}
    </nav>
  );
}

export function StoreSubcategoryMenu({
  category,
  activeSubcategorySlug,
}: {
  category: StorefrontCategory;
  activeSubcategorySlug?: string;
}) {
  if (category.subcategories.length === 0) return null;

  return (
    <nav aria-label={`${getCatalogLabel(category)} collections`}>
      <ul className="flex flex-wrap justify-center gap-2">
        {category.subcategories.map((subcategory) => {
          const active = subcategory.slug === activeSubcategorySlug;

          return (
            <li key={subcategory.id}>
              <Link
                href={getSubcategoryPath(category, subcategory)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--border)] text-[var(--ink-soft)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                }`}
              >
                {getCatalogLabel(subcategory)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
