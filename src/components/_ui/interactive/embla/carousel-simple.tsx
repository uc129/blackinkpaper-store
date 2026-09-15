"use client";

import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import { FrostedToolbar } from "@/components/_ui/interactive/artwork-controls";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./carousel-simple-buttons";
import "./embla.css";

export type GalleryItem = {
  src: string;
  alt?: string;
  thumb?: string;
  title?: string;
  slideName?: string;
  slug?: string;
};

type Props = {
  slides: GalleryItem[];
  options?: EmblaOptionsType;
  delay?: number;
  onImageClick?: (
    index: number,
    item: GalleryItem,
    event: React.MouseEvent,
  ) => void;
  actionButton?: {
    label: string;
    hrefPrefix: string;
  };
};

export default function EmblaCarousel({
  slides,
  options,
  delay = 8000,
  onImageClick,
  actionButton,
}: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const canLoop = slides.length >= 5;
  const plugins = useMemo(
    () => [
      ...(reducedMotion || slides.length <= 1
        ? []
        : [Autoplay({ delay, stopOnInteraction: false })]),
      ClassNames(),
    ],
    [delay, reducedMotion, slides.length],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: canLoop,
      skipSnaps: false,
      dragFree: false,
      ...options,
    },
    plugins,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    nextBtnDisabled,
    onNextButtonClick,
    onPrevButtonClick,
    prevBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex] ?? slides[0];
  const productHref =
    actionButton && currentSlide.slug
      ? `${actionButton.hrefPrefix}/${currentSlide.slug}`
      : "/store";

  return (
    <section className="embla" aria-label="New artwork launches">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              className="embla__slide"
              key={`${slide.src}-${slide.slug ?? index}`}
            >
              <button
                type="button"
                className="embla__slide__inner"
                onClick={(event) => onImageClick?.(index, slide, event)}
                aria-label={`Open ${slide.title || "artwork"} in full view`}
              >
                <ImageWithFallback
                  src={slide.src}
                  alt={slide.alt || ""}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(min-width: 988px) 78vw, 88vw"
                  className="embla__slide__img"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <FrostedToolbar className="embla__controls mt-0 rounded-b-[10px]">
        <div className="min-w-11">
          {slides.length > 1 && (
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              aria-label="Previous artwork"
            />
          )}
        </div>

        <Link
          href={productHref}
          className="min-w-0 text-center text-sm text-[var(--ink)] hover:underline"
        >
          <span className="block truncate font-medium">
            {currentSlide.slideName || currentSlide.title || "Artwork"}
          </span>
          <span className="text-xs tabular-nums text-[var(--muted)]">
            {currentIndex + 1} / {slides.length}
          </span>
        </Link>

        <div className="flex min-w-11 justify-end">
          {slides.length > 1 && (
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              aria-label="Next artwork"
            />
          )}
        </div>
      </FrostedToolbar>
    </section>
  );
}
