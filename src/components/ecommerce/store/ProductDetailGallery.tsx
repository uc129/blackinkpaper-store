"use client";

import { useState } from "react";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import ProductLightbox from "./ProductLightbox";

export type GalleryImage = {
  src: string;
  thumb?: string;
  alt?: string;
  title?: string;
  eyebrow?: string;
  price?: string;
  href?: string;
};

type Props = {
  images: GalleryImage[];
  accessionCode?: string | null;
  className?: string;
  imageFit?: "cover" | "contain";
};

export default function ProductDetailGallery({
  images,
  accessionCode,
  className,
  imageFit = "contain",
}: Props) {
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeImage = images[active];

  if (!activeImage) {
    return (
      <div
        className={`flex h-[50vh] min-h-96 w-full items-center justify-center bg-[var(--paper-deep)] text-sm text-[var(--muted)] ${className ?? ""}`}
      >
        No product images returned by the server.
      </div>
    );
  }

  return (
    <div className={`product-gallery ${className ?? ""}`}>
      <button
        type="button"
        className="product-gallery__stage"
        onClick={() => setIsLightboxOpen(true)}
        aria-label="Open product image viewer"
      >
        {accessionCode && (
          <span className="product-gallery__accession">{accessionCode}</span>
        )}
        <ImageWithFallback
          src={activeImage.src}
          alt={activeImage.alt ?? ""}
          fill
          loading="eager"
          fetchPriority="high"
          className={imageFit === "contain" ? "object-contain" : "object-cover"}
          sizes="(min-width: 988px) 55vw, 100vw"
        />
        <span className="product-gallery__zoom">Click to zoom</span>
      </button>

      <div className="product-gallery__thumbnails">
        {images.map((img, i) => (
          <button
            key={`${img.src}-${img.thumb ?? "thumbnail"}`}
            type="button"
            onClick={() => setActive(i)}
            className="product-gallery__thumbnail"
            aria-label={`View product image ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
          >
            <ImageWithFallback
              src={img.thumb ?? img.src}
              alt=""
              fill
              sizes="96px"
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
          </button>
        ))}
        <span className="product-gallery__sheet-label">Full sheet</span>
      </div>

      <ProductLightbox
        images={images}
        isOpen={isLightboxOpen}
        selectedIndex={active}
        onSelect={setActive}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
}
