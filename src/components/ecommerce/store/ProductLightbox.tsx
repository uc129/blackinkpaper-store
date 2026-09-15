"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { GalleryImage } from "./ProductDetailGallery";

type Props = {
  images: GalleryImage[];
  isOpen: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
};

function preloadGalleryImage(src: string) {
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise<void>((resolve) => {
    const image = new window.Image();
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = src;
    image
      .decode?.()
      .then(finish)
      .catch(() => undefined);
  });
}

export default function ProductLightbox({
  images,
  isOpen,
  selectedIndex,
  onSelect,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const currentImage = images[selectedIndex];
  const hasMultipleImages = images.length > 1;
  const [displayedImage, setDisplayedImage] = useState<
    GalleryImage | undefined
  >(currentImage);
  const [imageVersion, setImageVersion] = useState(0);
  const adjacentImages = useMemo(() => {
    if (!hasMultipleImages) return [];
    const previousIndex = (selectedIndex - 1 + images.length) % images.length;
    const nextIndex = (selectedIndex + 1) % images.length;
    return [images[previousIndex], images[nextIndex]].filter(
      (image, index, list) =>
        image && list.findIndex((item) => item.src === image.src) === index,
    );
  }, [hasMultipleImages, images, selectedIndex]);

  useEffect(() => {
    if (!isOpen && currentImage) setDisplayedImage(currentImage);
  }, [currentImage, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocusTo = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusTo?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !currentImage || displayedImage?.src === currentImage.src) {
      return;
    }

    let cancelled = false;
    preloadGalleryImage(currentImage.src).then(() => {
      if (cancelled) return;
      setDisplayedImage(currentImage);
      setImageVersion((version) => version + 1);
    });
    return () => {
      cancelled = true;
    };
  }, [currentImage, displayedImage?.src, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    adjacentImages.forEach((image) => {
      void preloadGalleryImage(image.src);
    });
  }, [adjacentImages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const selectPreviousImage = () =>
      onSelect((selectedIndex - 1 + images.length) % images.length);
    const selectNextImage = () => onSelect((selectedIndex + 1) % images.length);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (hasMultipleImages && event.key === "ArrowLeft") selectPreviousImage();
      if (hasMultipleImages && event.key === "ArrowRight") selectNextImage();

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    hasMultipleImages,
    images.length,
    isOpen,
    onClose,
    onSelect,
    selectedIndex,
  ]);

  if (!isOpen || !currentImage || !displayedImage) return null;

  const selectPreviousImage = () =>
    onSelect((selectedIndex - 1 + images.length) % images.length);
  const selectNextImage = () => onSelect((selectedIndex + 1) % images.length);
  const hasMetadata = Boolean(
    displayedImage.title || displayedImage.eyebrow || displayedImage.price,
  );

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-[var(--footer-ink)] text-white animate-[product-lightbox-fade_180ms_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label="Artwork viewer"
      tabIndex={-1}
      ref={dialogRef}
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-1 flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-4 px-6 pb-4 pt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/60">
            {selectedIndex + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[var(--ink)] active:scale-90"
            aria-label="Close artwork viewer"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div
          className={`${hasMetadata ? "artwork-lightbox-layout" : "flex"} relative min-h-0 flex-1 gap-6 px-6 pb-4`}
        >
          <div className="relative min-h-[50vh]">
            {hasMultipleImages && (
              <button
                type="button"
                onClick={selectPreviousImage}
                className="absolute left-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[var(--footer-ink)] text-white transition hover:bg-white hover:text-[var(--ink)] active:scale-90"
                aria-label="View previous image"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
            )}
            <ImageWithFallback
              key={`${displayedImage.src}-${imageVersion}`}
              src={displayedImage.src}
              alt={displayedImage.alt ?? ""}
              fill
              loading="eager"
              fetchPriority="high"
              sizes={hasMetadata ? "(min-width: 988px) 75vw, 100vw" : "100vw"}
              className="object-contain animate-[product-lightbox-image_140ms_ease-out]"
            />
            {hasMultipleImages && (
              <button
                type="button"
                onClick={selectNextImage}
                className="absolute right-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[var(--footer-ink)] text-white transition hover:bg-white hover:text-[var(--ink)] active:scale-90"
                aria-label="View next image"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            )}
          </div>

          {hasMetadata && (
            <aside className="flex flex-col justify-end gap-3 border-t border-white/20 py-6 text-left lg:border-l lg:border-t-0 lg:pl-6">
              {displayedImage.eyebrow && (
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                  {displayedImage.eyebrow}
                </p>
              )}
              {displayedImage.title && (
                <h2 className="font-display text-3xl leading-tight">
                  {displayedImage.title}
                </h2>
              )}
              {displayedImage.price && (
                <p className="text-lg">{displayedImage.price}</p>
              )}
              {displayedImage.href && (
                <Link
                  href={displayedImage.href}
                  className="mt-2 underline underline-offset-4"
                >
                  View product
                </Link>
              )}
            </aside>
          )}
        </div>

        {hasMultipleImages && (
          <div className="mx-auto flex max-w-full gap-3 overflow-x-auto px-6 pb-5">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => onSelect(index)}
                className={`relative size-16 shrink-0 overflow-hidden border transition sm:size-20 ${
                  selectedIndex === index
                    ? "border-white opacity-100"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
              >
                <ImageWithFallback
                  src={image.thumb ?? image.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
