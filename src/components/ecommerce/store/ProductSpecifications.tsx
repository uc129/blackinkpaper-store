import type { ArtSpecificationsDto } from "@/lib/api/storefront/types";

type Specification = {
  label: string;
  value: string;
};

function formatDimensions(artSpecs: ArtSpecificationsDto) {
  const dimensions = artSpecs.physicalDimensions;
  if (!dimensions) return null;
  return `${dimensions.width} × ${dimensions.height}${dimensions.unit ? ` ${dimensions.unit}` : ""}`;
}

function getOriginalSpecifications(
  artSpecs: ArtSpecificationsDto,
): Specification[] {
  const framing =
    artSpecs.framingStatus ||
    (artSpecs.isFramed === null || artSpecs.isFramed === undefined
      ? null
      : artSpecs.isFramed
        ? "Framed"
        : "Unframed");

  return [
    { label: "Paper", value: artSpecs.paperType || "" },
    { label: "Paper weight", value: artSpecs.paperWeight || "" },
    { label: "Ink / medium", value: artSpecs.inkType || "" },
    { label: "Material", value: artSpecs.material || "" },
    { label: "Dimensions", value: formatDimensions(artSpecs) || "" },
    {
      label: "Weight",
      value:
        typeof artSpecs.weightGrams === "number"
          ? `${artSpecs.weightGrams} g`
          : "",
    },
    { label: "Framing", value: framing || "" },
    { label: "Signed", value: artSpecs.isSigned ? "Yes" : "No" },
    {
      label: "Certificate of authenticity",
      value: artSpecs.hasCertificate ? "Included" : "No",
    },
  ].filter((item) => item.value);
}

function getPrintSpecifications(
  artSpecs: ArtSpecificationsDto,
): Specification[] {
  return [
    { label: "File format", value: artSpecs.fileFormat || "" },
    {
      label: "Resolution",
      value:
        typeof artSpecs.resolutionDpi === "number"
          ? `${artSpecs.resolutionDpi} DPI`
          : "",
    },
    { label: "Pixel dimensions", value: artSpecs.pixelDimensions || "" },
    { label: "Material", value: artSpecs.material || "" },
    { label: "Dimensions", value: formatDimensions(artSpecs) || "" },
    {
      label: "Weight",
      value:
        typeof artSpecs.weightGrams === "number"
          ? `${artSpecs.weightGrams} g`
          : "",
    },
    {
      label: "Framing",
      value:
        artSpecs.isFramed === null || artSpecs.isFramed === undefined
          ? ""
          : artSpecs.isFramed
            ? "Framed"
            : "Unframed",
    },
  ].filter((item) => item.value);
}

export function ProductSpecifications({
  artSpecs,
  isOriginal,
}: {
  artSpecs?: ArtSpecificationsDto | null;
  isOriginal: boolean;
}) {
  if (!artSpecs) return null;

  const specifications = isOriginal
    ? getOriginalSpecifications(artSpecs)
    : getPrintSpecifications(artSpecs);
  if (specifications.length === 0) return null;

  return (
    <section
      className="border-y border-[var(--border)] py-5"
      aria-labelledby="product-specifications"
    >
      <h2
        id="product-specifications"
        className="font-display text-xl text-[var(--ink)]"
      >
        {isOriginal ? "Provenance & details" : "Print details"}
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {specifications.map((specification) => (
          <div
            key={specification.label}
            className="border-t border-[var(--border)] pt-3"
          >
            <dt className="text-[var(--muted)]">{specification.label}</dt>
            <dd className="mt-1 font-medium text-[var(--ink)]">
              {specification.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
