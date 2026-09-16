import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ProductResponseDto } from "@/lib/api/storefront/types";
import HandleCartLogicComponent from "./HandleCartLogic";

vi.mock("@/lib/hooks/redux-hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: (state: unknown) => unknown) =>
    selector({ auth: { status: "unauthenticated" }, cart: { status: "idle" } }),
}));

function makeProduct(isOriginal: boolean): ProductResponseDto {
  return {
    id: isOriginal ? 71 : 70,
    productId: isOriginal ? "BIP-RM-ORG-024" : "BIP-RM-PRT-023",
    name: isOriginal ? "Apsara" : "Blue Relief (Print)",
    slug: isOriginal ? "apsara" : "blue-relief-print",
    artistId: 1,
    pricing: {
      basePrice: isOriginal ? 15000 : 1199,
      finalPrice: isOriginal ? 15000 : 1199,
      currencyCode: "INR",
    },
    taxonomy: {
      categoryId: 1,
      subCategoryId: 1,
      isFeatured: false,
      isAvailable: true,
    },
    media: {},
    stats: { averageRating: 0, reviewCount: 0, stockQuantity: 1 },
    isUsingStandardVariants: !isOriginal,
    artSpecs: {
      isOriginal,
      isSigned: false,
      hasCertificate: false,
      framingStatus: "Unframed",
      paperType: "Paper",
      fileFormat: "JPG",
      resolutionDpi: 300,
    },
    content: { printName: isOriginal ? null : "Blue Relief" },
    tags: [],
    images: [],
    variants: isOriginal
      ? []
      : [
          {
            id: 131,
            label: "A4 Digital Download",
            fulfillmentType: 0,
            absolutePrice: 1199,
            options: [{ id: 141, value: "A4", isDefault: true }],
          },
          {
            id: 132,
            label: "A4 Fine Art Print",
            fulfillmentType: 1,
            absolutePrice: 2400,
            stockQuantity: 2,
            options: [{ id: 142, value: "A4" }],
          },
        ],
  };
}

describe("route-specific product purchase panel", () => {
  it("keeps an original one of one, without print edition controls", () => {
    render(<HandleCartLogicComponent product={makeProduct(true)} />);

    expect(screen.getByRole("heading", { name: "Apsara" })).toBeInTheDocument();
    expect(screen.getByText("Original · 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("Unsigned")).toBeInTheDocument();
    expect(screen.getByText("Not included")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Acquire original" }),
    ).toBeEnabled();
    expect(screen.queryByText("Choose an edition")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Increase quantity" }),
    ).not.toBeInTheDocument();
  });

  it("switches print fulfillment, price, and quantity without changing routes", async () => {
    const user = userEvent.setup();
    render(<HandleCartLogicComponent product={makeProduct(false)} />);

    expect(
      screen.getByRole("heading", { name: "Blue Relief" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Choose an edition")).toBeInTheDocument();
    expect(
      screen.getByText("Available to download after checkout"),
    ).toBeInTheDocument();

    const physicalEdition = screen.getByRole("button", {
      name: /A4 Fine Art Print/,
    });
    await user.click(physicalEdition);

    expect(physicalEdition).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText("₹2,400.00", { selector: ".product-purchase__price" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Printed to order in 3 working days"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(
      screen.getByText("2", { selector: ".product-purchase__quantity span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Increase quantity" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Add print to cart" }),
    ).toBeEnabled();
  });
});
