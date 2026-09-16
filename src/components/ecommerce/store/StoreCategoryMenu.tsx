import Link from "next/link";
import {
  getCatalogLabel,
  getCategoryPath,
  type StorefrontCategory,
} from "@/lib/api/storefront/categories";

export function StoreCategoryMenu({
  catalog,
  activeCategorySlug,
  variant = "pills",
}: {
  catalog: StorefrontCategory[];
  activeCategorySlug?: string;
  variant?: "pills" | "editorial";
}) {
  const categories =
    variant === "editorial"
      ? catalog.filter((category) =>
          ["originals", "prints"].includes(category.slug ?? ""),
        )
      : catalog;

  return (
    <nav
      aria-label="Store collections"
      className={
        variant === "editorial"
          ? "editorial-category-menu"
          : "mx-auto flex flex-wrap justify-center gap-2 border-b border-[var(--border)] pb-4"
      }
    >
      {categories.map((category) => {
        const active = category.slug === activeCategorySlug;

        return (
          <Link
            key={category.id}
            href={getCategoryPath(category)}
            aria-current={active ? "page" : undefined}
            className={
              variant === "editorial"
                ? active
                  ? "is-active"
                  : ""
                : `rounded-full border px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)]"
                  }`
            }
          >
            {getCatalogLabel(category)}
          </Link>
        );
      })}
    </nav>
  );
}
