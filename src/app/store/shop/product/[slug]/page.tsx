import { notFound } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import ProductDetailGallery, { GalleryImage } from "@/components/ecommerce/store/ProductDetailGallery";
import Section from "@/components/_ui/containers/base/section";
import HandleCartLogicComponent from "./HandleCartLogic";
import { ContainerSimpleInLine } from "@/components/_ui/containers/container-simple";
import { storefrontProductService } from "@/lib/api/storefront/services";
import { ApiError } from "@/lib/api/client";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product;

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

  const fallbackMediaImage = product.media.coverImageUrl || product.media.headerImageUrl || null;
  const imageSource = product.images.length > 0
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
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.displayOrder - b.displayOrder)
    .filter((image) => image.baseUrl || image.placeholderUrl || fallbackMediaImage)
    .map((image) => ({
      src: image.baseUrl || image.placeholderUrl || fallbackMediaImage || "",
      thumb: image.placeholderUrl || image.baseUrl || fallbackMediaImage || "",
      alt: image.altText || product.name || "Product image",
    }));

  return (
    <Page className="items-center py-10 md:py-16">
      <ContainerSimpleInLine className="w-full mx-auto gap-8 sm:gap-12 lg:gap-16">
        <Section customPadding={{ l: "0", r: "0", t: "0", b: "0" }}>
          <ProductDetailGallery images={galleryImages} />
        </Section>

        <Section customPadding={{ l: "0", r: "0", t: "0", b: "0" }} className="flex flex-col">
          <HandleCartLogicComponent product={product} />
        </Section>
      </ContainerSimpleInLine>
    </Page>
  );
}
