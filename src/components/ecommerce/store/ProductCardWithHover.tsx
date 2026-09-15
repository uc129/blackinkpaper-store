"use client";

import { ArrowUpRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { PriceTag } from "../PriceTag";

function ProductArtwork({
  product,
  priority,
}: {
  product: ProductSummaryDto;
  priority: boolean;
}) {
  const coverImage =
    product.media.coverImageUrl || product.media.headerImageUrl;
  const hoverImage = product.media.headerImageUrl || coverImage;
  const hasHoverImage = Boolean(
    coverImage && hoverImage && hoverImage !== coverImage,
  );

  if (!coverImage) {
    return (
      <span className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
        No image from server
      </span>
    );
  }

  return (
    <>
      <ImageWithFallback
        src={coverImage}
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(min-width: 1348px) 25vw, (min-width: 988px) 42vw, 100vw"
        alt={product.name || "Product artwork"}
        className={`object-cover transition duration-500 group-hover:scale-[1.02] ${
          hasHoverImage ? "group-hover:opacity-0" : ""
        }`}
      />
      {hasHoverImage && hoverImage && (
        <ImageWithFallback
          src={hoverImage}
          fill
          sizes="(min-width: 1348px) 25vw, (min-width: 988px) 42vw, 100vw"
          alt=""
          className="object-cover opacity-0 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      )}
    </>
  );
}

function AvailabilityBadge({ product }: { product: ProductSummaryDto }) {
  const soldOut = product.stats.stockQuantity === 0;
  return (
    <span
      className={`absolute left-4 top-4 z-2 rounded-full border px-3 py-1 text-xs font-medium ${
        soldOut
          ? "border-[var(--danger)] bg-[var(--paper)] text-[var(--danger)]"
          : "border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]"
      }`}
    >
      {soldOut
        ? "Sold out"
        : product.isOriginal
          ? "Original · 1 of 1"
          : "Print"}
    </span>
  );
}

function ProductCardText({ product }: { product: ProductSummaryDto }) {
  return (
    <div className="flex flex-col gap-3 pt-5">
      <h2 className="line-clamp-2 font-display text-2xl font-bold leading-tight text-[var(--ink)]">
        {product.name}
      </h2>
      <PriceTag
        previous={
          product.pricing.basePrice === product.pricing.finalPrice
            ? undefined
            : product.pricing.basePrice
        }
        price={product.pricing.finalPrice}
        currencyCode={product.pricing.currencyCode || "INR"}
      />
    </div>
  );
}

export default function ProductCardWithHover({
  product,
  notificationText,
  priority = false,
}: {
  product: ProductSummaryDto;
  notificationText?: string;
  priority?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const frontControlRef = useRef<HTMLButtonElement>(null);
  const backControlRef = useRef<HTMLAnchorElement>(null);
  const href = `/store/shop/product/${product.slug}`;
  const canFlip = Boolean(
    !product.isOriginal &&
      (product.shortDescription || product.isSigned !== undefined),
  );

  if (!canFlip) {
    return (
      <Link href={href} className="product-card-link group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--paper-deep)]">
          <AvailabilityBadge product={product} />
          <ProductArtwork product={product} priority={priority} />
        </div>
        <ProductCardText product={product} />
        {notificationText && (
          <span className="mt-2 block text-sm text-[var(--ink-soft)]">
            {notificationText.toUpperCase()}
          </span>
        )}
      </Link>
    );
  }

  const showBack = () => {
    setFlipped(true);
    window.requestAnimationFrame(() => backControlRef.current?.focus());
  };
  const showFront = () => {
    setFlipped(false);
    window.requestAnimationFrame(() => frontControlRef.current?.focus());
  };

  return (
    <article className="product-flip-card">
      <div className={`product-flip-card__body ${flipped ? "is-flipped" : ""}`}>
        <div
          className={`product-flip-card__face product-flip-card__front ${
            flipped ? "pointer-events-none" : ""
          }`}
          aria-hidden={flipped}
        >
          <button
            ref={frontControlRef}
            type="button"
            onClick={showBack}
            tabIndex={flipped ? -1 : 0}
            className="group relative min-h-0 flex-1 overflow-hidden bg-[var(--paper-deep)] text-left"
            aria-label={`Read details about ${product.name || "this print"}`}
          >
            <AvailabilityBadge product={product} />
            <ProductArtwork product={product} priority={priority} />
            <span className="absolute bottom-3 right-3 inline-flex size-11 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--ink)] shadow-sm transition active:scale-90">
              <RotateCcw size={18} aria-hidden="true" />
            </span>
          </button>
          <ProductCardText product={product} />
        </div>

        <div
          className={`product-flip-card__face product-flip-card__back rounded-[10px] bg-[var(--paper)] p-6 ${
            flipped ? "" : "pointer-events-none"
          }`}
          aria-hidden={!flipped}
        >
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Print details
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-[var(--ink)]">
              {product.name}
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--ink-soft)]">
              {product.shortDescription ||
                "More information is available on the product page."}
            </p>
          </div>

          <dl className="mt-auto flex gap-4 border-t border-[var(--border)] pt-4 text-sm">
            <div className="flex-1">
              <dt className="text-[var(--muted)]">Availability</dt>
              <dd className="mt-1">
                {product.stats.stockQuantity === 0 ? "Sold out" : "Available"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-[var(--muted)]">Signed</dt>
              <dd className="mt-1">
                {product.isSigned === undefined || product.isSigned === null
                  ? "See details"
                  : product.isSigned
                    ? "Yes"
                    : "No"}
              </dd>
            </div>
          </dl>

          <div className="flex items-center justify-between gap-3 pt-6">
            <button
              type="button"
              onClick={showFront}
              tabIndex={flipped ? 0 : -1}
              className="inline-flex size-11 items-center justify-center rounded-full text-[var(--ink)] transition hover:bg-[var(--paper-deep)] active:scale-90"
              aria-label="Return to artwork image"
            >
              <RotateCcw size={18} aria-hidden="true" />
            </button>
            <Link
              ref={backControlRef}
              href={href}
              tabIndex={flipped ? 0 : -1}
              className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
            >
              View product <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
