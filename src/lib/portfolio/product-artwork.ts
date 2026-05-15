import type { ProductImageDto, ProductResponseDto } from "@/lib/api/storefront/types";

export type PortfolioGalleryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isPrimary?: boolean;
};

function getFallbackImage(product: ProductResponseDto) {
  return product.media.headerImageUrl || product.media.coverImageUrl || null;
}

function toGalleryImage(product: ProductResponseDto, image: ProductImageDto): PortfolioGalleryImage | null {
  const src = image.baseUrl || image.placeholderUrl || getFallbackImage(product);
  if (!src) return null;

  return {
    src,
    alt: image.altText || product.name || "Portfolio artwork",
    width: image.width,
    height: image.height,
    isPrimary: image.isPrimary,
  };
}

export function getPortfolioGalleryImages(product: ProductResponseDto): PortfolioGalleryImage[] {
  const fallbackImage = getFallbackImage(product);
  const images = product.images
    .slice()
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.displayOrder - b.displayOrder)
    .map((image) => toGalleryImage(product, image))
    .filter((image): image is PortfolioGalleryImage => Boolean(image));

  if (images.length > 0) return images;

  return fallbackImage
    ? [
        {
          src: fallbackImage,
          alt: product.name || "Portfolio artwork",
          isPrimary: true,
        },
      ]
    : [];
}

export function getPortfolioHeroImage(product: ProductResponseDto) {
  return product.media.headerImageUrl || product.media.coverImageUrl || getPortfolioGalleryImages(product)[0]?.src || null;
}
