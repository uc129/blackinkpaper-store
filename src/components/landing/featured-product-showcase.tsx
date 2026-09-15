"use client";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback";
import {
  ArtworkIconButton,
  FrostedToolbar,
} from "@/components/_ui/interactive/artwork-controls";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import { formatPriceToIntl } from "@/lib/utils";

type ShowcaseKind = "original" | "print";

function getShowcaseImage(product: ProductSummaryDto) {
  return product.media.coverImageUrl || product.media.headerImageUrl || null;
}

export function FeaturedProductShowcase({
  products,
  kind,
}: {
  products: ProductSummaryDto[];
  kind: ShowcaseKind;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const product = products[activeIndex];

  if (!product) return null;

  const image = getShowcaseImage(product);
  const isOriginal = kind === "original";
  const hasNavigation = products.length > 1;
  const productHref = `/store/shop/product/${product.slug}`;
  const collectionHref = `/store/shop/category/${isOriginal ? "originals" : "prints"}`;
  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (current) => (current + direction + products.length) % products.length,
    );
  };

  return (
    <article aria-label={`Featured ${kind}`}>
      <div
        className={`featured-showcase-card overflow-hidden rounded-t-[10px] bg-[var(--paper)] transition-[min-height] duration-300 ${
          expanded
            ? "min-h-[32rem] lg:min-h-[40rem]"
            : "min-h-[26rem] lg:min-h-[32rem]"
        }`}
      >
        <div
          className={`relative min-h-72 overflow-hidden bg-[var(--paper-deep)] lg:col-span-7 ${
            isOriginal ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {image ? (
            <ImageWithFallback
              key={image}
              src={image}
              alt={product.name || `${kind} artwork`}
              fill
              sizes="(min-width: 988px) 70vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full min-h-72 items-center justify-center text-sm text-[var(--muted)]">
              No artwork image available
            </div>
          )}
        </div>

        <div
          className={`flex flex-col justify-end gap-6 p-6 text-left sm:p-8 lg:col-span-3 ${
            isOriginal ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Featured {isOriginal ? "Original" : "Print"}
            </p>
            <h2 className="font-display text-3xl leading-tight text-[var(--ink)] sm:text-4xl">
              {product.name || "Untitled artwork"}
            </h2>
            {product.shortDescription && (
              <p className="max-w-md leading-relaxed text-[var(--ink-soft)]">
                {product.shortDescription}
              </p>
            )}
          </div>

          <dl className="flex gap-4 border-t border-[var(--border)] pt-4 text-sm">
            <div className="flex-1">
              <dt className="text-[var(--muted)]">Availability</dt>
              <dd className="mt-1 text-[var(--ink)]">
                {product.stats.stockQuantity === 0 ? "Sold out" : "Available"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-[var(--muted)]">Format</dt>
              <dd className="mt-1 text-[var(--ink)]">
                {isOriginal ? "One of one" : "Fine art print"}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="text-lg font-semibold text-[var(--ink)]">
              {formatPriceToIntl(
                product.pricing.finalPrice,
                product.pricing.currencyCode || "INR",
              )}
            </p>
            <Link
              href={collectionHref}
              className="store-link inline-flex items-center gap-2 text-sm"
            >
              View all <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <FrostedToolbar className="rounded-b-[10px]">
        <div className="flex min-w-24 items-center gap-1">
          {hasNavigation && (
            <ArtworkIconButton
              onClick={() => move(-1)}
              aria-label={`Previous featured ${kind}`}
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </ArtworkIconButton>
          )}
          <span className="text-xs tabular-nums text-[var(--muted)]">
            {activeIndex + 1} / {products.length}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href={productHref}
            className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-[var(--ink)] underline decoration-1 underline-offset-4 transition hover:text-[var(--accent-1)]"
          >
            {isOriginal ? "Acquire" : "Buy now"}
          </Link>
          <ArtworkIconButton
            onClick={() => setExpanded((current) => !current)}
            aria-label={expanded ? "Use compact showcase" : "Expand showcase"}
            aria-pressed={expanded}
          >
            {expanded ? (
              <Minimize2 size={20} aria-hidden="true" />
            ) : (
              <Maximize2 size={20} aria-hidden="true" />
            )}
          </ArtworkIconButton>
          {hasNavigation && (
            <ArtworkIconButton
              onClick={() => move(1)}
              aria-label={`Next featured ${kind}`}
            >
              <ChevronRight size={24} aria-hidden="true" />
            </ArtworkIconButton>
          )}
        </div>
      </FrostedToolbar>
    </article>
  );
}
