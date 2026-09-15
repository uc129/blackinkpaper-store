import { describe, expect, it } from "vitest";
import {
  buildPaginatedPath,
  getPageCount,
  getPaginationItems,
  parsePageParam,
} from "./pagination";

describe("store pagination", () => {
  it("parses only one-based integer pages", () => {
    expect(parsePageParam(undefined)).toBe(1);
    expect(parsePageParam("3")).toBe(3);
    expect(parsePageParam("0")).toBeNull();
    expect(parsePageParam("2.5")).toBeNull();
    expect(parsePageParam(["1", "2"])).toBeNull();
  });

  it("always exposes at least one page", () => {
    expect(getPageCount(0, 8)).toBe(1);
    expect(getPageCount(17, 8)).toBe(3);
  });

  it("condenses long page ranges around the current page", () => {
    expect(getPaginationItems(6, 12)).toEqual([
      1,
      "ellipsis-start",
      5,
      6,
      7,
      "ellipsis-end",
      12,
    ]);
  });

  it("omits page one while preserving filters and the product anchor", () => {
    expect(
      buildPaginatedPath("/store/shop/category/prints", 1, {
        page: "4",
        sort: "newest",
      }),
    ).toBe("/store/shop/category/prints?sort=newest#products");
  });
});
