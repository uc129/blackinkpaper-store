import { notFound } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import ProductDetailGallery, {
  type GalleryImage,
} from "@/components/ecommerce/store/ProductDetailGallery";
import { ApiError } from "@/lib/api/client";
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

  return (
    <Page className="items-center py-10 md:py-16">
      <div className="product-detail-layout mx-auto w-full gap-8 sm:gap-12 lg:gap-16">
        <Section customPadding={{ l: "0", r: "0", t: "0", b: "0" }}>
          <ProductDetailGallery
            images={galleryImages}
            imageFit={product.artSpecs?.isOriginal ? "contain" : "cover"}
          />
        </Section>

        <Section
          customPadding={{ l: "0", r: "0", t: "0", b: "0" }}
          className="flex flex-col"
        >
          <HandleCartLogicComponent product={product} />
        </Section>
      </div>
    </Page>
  );
}
