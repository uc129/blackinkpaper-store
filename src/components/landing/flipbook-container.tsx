"use client";

import { useState } from "react";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import EmblaCarouselSimple, {
  type GalleryItem,
} from "@/components/_ui/interactive/embla/carousel-simple";
import type { GalleryImage } from "@/components/ecommerce/store/ProductDetailGallery";
import ProductLightbox from "@/components/ecommerce/store/ProductLightbox";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { formatPriceToIntl } from "@/lib/utils";

function toGalleryItems(products: ProductSummaryDto[]): GalleryItem[] {
  return products.flatMap((product) => {
    const src = product.media.coverImageUrl || product.media.headerImageUrl;
    if (!src) return [];

    return [
      {
        src,
        thumb: src,
        title: product.name || "Artwork",
        alt: `${product.name || "Artwork"} by Ria Mukharjee`,
        slideName: product.name || "Artwork",
        slug: product.slug || "",
      },
    ];
  });
}

function toLightboxImages(
  products: ProductSummaryDto[],
  galleryItems: GalleryItem[],
): GalleryImage[] {
  return galleryItems.map((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);
    return {
      src: item.src,
      thumb: item.thumb,
      alt: item.alt,
      title: item.title,
      eyebrow: product?.isOriginal ? "Original · One of one" : "New print",
      price: product
        ? formatPriceToIntl(
            product.pricing.finalPrice,
            product.pricing.currencyCode || "INR",
          )
        : undefined,
      href: item.slug ? `/store/shop/product/${item.slug}` : "/store",
    };
  });
}

export function LandingFlipbookContainer({
  products,
}: {
  products: ProductSummaryDto[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const galleryItems = toGalleryItems(products);
  const lightboxImages = toLightboxImages(products, galleryItems);

  return (
    <ContainerSimple className="w-full gap-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          New launches
        </p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
          Recently released from the studio
        </h2>
      </div>

      {galleryItems.length > 0 ? (
        <>
          <EmblaCarouselSimple
            slides={galleryItems}
            onImageClick={(index) => {
              setSelectedIndex(index);
              setIsOpen(true);
            }}
            delay={8000}
            actionButton={{
              label: "View product",
              hrefPrefix: "/store/shop/product",
            }}
          />
          <ProductLightbox
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            images={lightboxImages}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </>
      ) : (
        <div className="border border-dashed border-[var(--border)] bg-[var(--paper)] p-8 text-center text-[var(--ink-soft)]">
          No product images returned by the server.
        </div>
      )}
    </ContainerSimple>
  );
}
