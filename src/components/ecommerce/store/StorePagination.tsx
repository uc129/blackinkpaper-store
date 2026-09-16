import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  buildPaginatedPath,
  getPaginationItems,
} from "@/lib/storefront/pagination";

export function StorePagination({
  currentPage,
  pageCount,
  pathname,
  searchParams,
  variant = "default",
}: {
  currentPage: number;
  pageCount: number;
  pathname: string;
  searchParams?: Record<string, string | string[] | undefined>;
  variant?: "default" | "editorial";
}) {
  if (pageCount <= 1) return null;

  const items = getPaginationItems(currentPage, pageCount);
  const pageHref = (page: number) =>
    buildPaginatedPath(pathname, page, searchParams);

  return (
    <nav
      aria-label="Product pages"
      className={`flex flex-wrap items-center justify-center gap-2 ${
        variant === "editorial" ? "editorial-pagination" : ""
      }`}
    >
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          rel="prev"
          className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition hover:border-[var(--ink)]"
          aria-label="Previous product page"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </Link>
      )}

      {items.map((item) =>
        typeof item === "string" ? (
          <span
            key={item}
            className="inline-flex size-11 items-center justify-center text-[var(--muted)]"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={pageHref(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={`inline-flex size-11 items-center justify-center rounded-full border text-sm tabular-nums transition ${
              item === currentPage
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)]"
            }`}
          >
            {item}
          </Link>
        ),
      )}

      {currentPage < pageCount && (
        <Link
          href={pageHref(currentPage + 1)}
          rel="next"
          className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition hover:border-[var(--ink)]"
          aria-label="Next product page"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
