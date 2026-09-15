const FIRST_PAGE = 1;

export function parsePageParam(value: string | string[] | undefined) {
  if (value === undefined) return FIRST_PAGE;
  if (Array.isArray(value) || !/^\d+$/.test(value)) return null;

  const page = Number(value);
  return Number.isSafeInteger(page) && page >= FIRST_PAGE ? page : null;
}

export function getPageCount(totalCount: number, pageSize: number) {
  if (pageSize <= 0) return FIRST_PAGE;
  return Math.max(FIRST_PAGE, Math.ceil(Math.max(0, totalCount) / pageSize));
}

export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export function getPaginationItems(
  currentPage: number,
  pageCount: number,
): PaginationItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    pageCount,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);
  const orderedPages = [...pages]
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b);

  return orderedPages.flatMap<PaginationItem>((page, index) => {
    const previousPage = orderedPages[index - 1];
    if (!previousPage || page - previousPage <= 1) return [page];
    return [previousPage === 1 ? "ellipsis-start" : "ellipsis-end", page];
  });
}

export function buildPaginatedPath(
  pathname: string,
  page: number,
  searchParams: Record<string, string | string[] | undefined> = {},
) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        query.append(key, entry);
      });
    } else {
      query.set(key, value);
    }
  }

  if (page > FIRST_PAGE) query.set("page", String(page));
  const serialized = query.toString();
  return `${pathname}${serialized ? `?${serialized}` : ""}#products`;
}
