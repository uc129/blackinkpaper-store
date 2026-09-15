import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductSpecifications } from "./ProductSpecifications";

describe("ProductSpecifications", () => {
  it("renders Original provenance and authenticity", () => {
    render(
      <ProductSpecifications
        isOriginal
        artSpecs={{
          isOriginal: true,
          isSigned: true,
          hasCertificate: true,
          paperType: "Cotton rag",
          paperWeight: "300 gsm",
          inkType: "India ink",
          physicalDimensions: { width: 42, height: 59.4, unit: "cm" },
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Provenance & details" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cotton rag")).toBeInTheDocument();
    expect(screen.getByText("India ink")).toBeInTheDocument();
    expect(screen.getByText("Included")).toBeInTheDocument();
    expect(screen.getByText("42 × 59.4 cm")).toBeInTheDocument();
  });

  it("renders print-specific technical details", () => {
    render(
      <ProductSpecifications
        isOriginal={false}
        artSpecs={{
          isOriginal: false,
          isSigned: false,
          hasCertificate: false,
          fileFormat: "TIFF",
          resolutionDpi: 300,
          pixelDimensions: "6000 × 4000",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Print details" }),
    ).toBeInTheDocument();
    expect(screen.getByText("300 DPI")).toBeInTheDocument();
    expect(
      screen.queryByText("Certificate of authenticity"),
    ).not.toBeInTheDocument();
  });
});
