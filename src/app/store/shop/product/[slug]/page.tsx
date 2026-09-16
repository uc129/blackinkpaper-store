import { notFound } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import ProductDetailGallery, {
  type GalleryImage,
} from "@/components/ecommerce/store/ProductDetailGallery";
import { EditorialProductRail } from "@/features/storefront/editorial/EditorialProductRail";
import { ApiError } from "@/lib/api/client";
import { getProductSuggestions } from "@/lib/api/storefront/recommendations";
import { storefrontProductService } from "@/lib/api/storefront/services";
import type { ProductResponseDto } from "@/lib/api/storefront/types";
import { formatPriceToIntl } from "@/lib/utils";
import HandleCartLogicComponent from "./HandleCartLogic";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product: ProductResponseDto;

  try {
    product = await storefrontProductService.getBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return (
      <Page>
        <StoreServerError message="Product details could not load because the store server is unavailable." />
      </Page>
    );
  }

  const fallbackMediaImage =
    product.media.coverImageUrl || product.media.headerImageUrl || null;
  const imageSource =
    product.images.length > 0
      ? product.images
      : fallbackMediaImage
        ? [
            {
              id: 0,
              baseUrl: fallbackMediaImage,
              altText: product.name || "Product image",
              isPrimary: true,
              displayOrder: 0,
              aspectRatio: 1,
              width: 800,
              height: 800,
            },
          ]
        : [];

  const galleryImages: GalleryImage[] = imageSource
    .slice()
    .sort(
      (a, b) =>
        Number(b.isPrimary) - Number(a.isPrimary) ||
        a.displayOrder - b.displayOrder,
    )
    .filter(
      (image) => image.baseUrl || image.placeholderUrl || fallbackMediaImage,
    )
    .map((image) => ({
      src: image.baseUrl || image.placeholderUrl || fallbackMediaImage || "",
      thumb: image.placeholderUrl || image.baseUrl || fallbackMediaImage || "",
      alt: image.altText || product.name || "Product image",
      title: product.name || "Untitled artwork",
      eyebrow: product.artSpecs?.isOriginal
        ? "Original · One of one"
        : "Fine art print",
      price: formatPriceToIntl(
        product.pricing.finalPrice,
        product.pricing.currencyCode || "INR",
      ),
      href: `/store/shop/product/${product.slug}`,
    }));

  const isOriginal = product.artSpecs?.isOriginal === true;
  const suggestions = await getProductSuggestions({
    query: { CategorySlug: isOriginal ? "originals" : "prints" },
    excludedIds: new Set([product.id]),
    limit: 3,
  });

  const metadata = [
    {
      label: "Subject",
      value:
        product.tags
          .map((tag) => tag.name)
          .filter(Boolean)
          .slice(0, 2)
          .join(", ") || "Illustrative study",
    },
    {
      label: "Medium",
      value:
        product.artSpecs?.inkType ||
        product.artSpecs?.material ||
        (isOriginal ? "Work on paper" : "Fine art reproduction"),
    },
    {
      label: "Catalogued",
      value: product.audit?.createdAt
        ? new Date(product.audit.createdAt).getFullYear().toString()
        : product.productId || "Studio archive",
    },
  ];

  return (
    <Page className="storefront-product-page">
      <div className="product-detail-shell">
        <section
          className="product-detail-artwork"
          aria-label="Artwork gallery and details"
        >
          <ProductDetailGallery
            images={galleryImages}
            accessionCode={product.productId}
            imageFit="contain"
          />

          <dl className="product-detail-metadata">
            {metadata.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="product-detail-about">
            <h2>About the {isOriginal ? "drawing" : "print"}</h2>
            <p>
              {product.content.description ||
                product.content.shortDescription ||
                "A studio work from the BlackInkPaper catalogue."}
            </p>
            <p>
              {isOriginal
                ? "Original works leave the studio carefully packed for transit, with their catalogue details recorded against the sheet."
                : "Prints are prepared from the studio master and produced to preserve the line, tone, and texture of the original work."}
            </p>
          </div>
        </section>

        <section
          className="product-detail-purchase"
          aria-label="Purchase options"
        >
          <HandleCartLogicComponent product={product} />
        </section>
      </div>

      <div className="product-detail-related">
        <EditorialProductRail
          products={suggestions}
          eyebrow={
            isOriginal ? "Drawn in the same season" : "From the studio archive"
          }
          title={isOriginal ? "More works on paper" : "More prints to collect"}
          linkLabel={isOriginal ? "All originals" : "All prints"}
          linkHref={`/store/shop/category/${isOriginal ? "originals" : "prints"}`}
        />
      </div>
    </Page>
  );
}
