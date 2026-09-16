"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  ArtSpecificationsDto,
  ProductResponseDto,
  ProductVariantDto,
  ProductVariantOptionDto,
} from "@/lib/api/storefront/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import {
  createDefaultSelections,
  getSelectedOptions,
  getSelectedStockLimit,
  getSelectedUnitPrice,
  hasCompleteVariantSelection,
  isVariantOptionAvailable,
  toCartVariantSelections,
} from "@/lib/products/product-selection";
import {
  addGuestCartItem,
  addServerCartItem,
} from "@/lib/redux/store/slices/cartSlice";
import { formatPriceToIntl } from "@/lib/utils";

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return "This artwork could not be added to your cart. Please try again.";
}

function formatDimensions(artSpecs?: ArtSpecificationsDto | null) {
  const dimensions = artSpecs?.physicalDimensions;
  if (!dimensions) return artSpecs?.paperType || "Paper";
  return `${dimensions.width} × ${dimensions.height}${dimensions.unit ? ` ${dimensions.unit}` : ""}`;
}

function getVariantDescription(
  variant: ProductVariantDto,
  option: ProductVariantOptionDto,
  artSpecs?: ArtSpecificationsDto | null,
) {
  if (variant.fulfillmentType === 0) {
    const format = artSpecs?.fileFormat || "Digital file";
    const resolution = artSpecs?.resolutionDpi
      ? ` · ${artSpecs.resolutionDpi} DPI`
      : "";
    return `${format}${resolution} · instant delivery`;
  }

  const medium = artSpecs?.paperType || "Fine art paper";
  const size =
    option.value && !variant.label?.includes(option.value)
      ? ` · ${option.value}`
      : "";
  return `${medium}${size} · made to order`;
}

function ProductDetails({
  product,
  isOriginal,
}: {
  product: ProductResponseDto;
  isOriginal: boolean;
}) {
  const catalogueId =
    product.productId || product.artworkId || "Studio catalogue";

  return (
    <div className="product-purchase__accordions">
      <details open>
        <summary>
          <span>Provenance &amp; documentation</span>
          <span aria-hidden="true" />
        </summary>
        <p>
          Catalogued as {catalogueId}.{" "}
          {isOriginal
            ? product.artSpecs?.hasCertificate
              ? "A certificate of authenticity is included with the work."
              : "The studio catalogue record accompanies the work."
            : "Edition and production details are recorded with the order."}
        </p>
      </details>
      <details>
        <summary>
          <span>Shipping &amp; packing</span>
          <span aria-hidden="true" />
        </summary>
        <p>
          {isOriginal
            ? "The sheet is protected with archival materials and packed for tracked transit."
            : "Physical prints are packed flat or rolled according to size. Digital editions are delivered electronically."}
        </p>
      </details>
      <details>
        <summary>
          <span>Care</span>
          <span aria-hidden="true" />
        </summary>
        <p>
          Keep away from direct sunlight and moisture. Use archival framing
          materials for physical works.
        </p>
      </details>
    </div>
  );
}

export default function HandleCartLogicComponent({
  product,
}: {
  product: ProductResponseDto;
}) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const variants = product.variants || [];
  const selectionMode = product.selectionMode ?? "single-configuration";
  const isOriginal = product.artSpecs?.isOriginal === true;
  const originalSoldOut = isOriginal && product.stats.stockQuantity === 0;
  const [productQuantity, setProductQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedOptionIds, setSelectedOptionIds] = useState(() =>
    createDefaultSelections(
      variants,
      product.defaultOptionId ?? undefined,
      selectionMode,
    ),
  );

  const selections = useMemo(
    () => getSelectedOptions(variants, selectedOptionIds),
    [selectedOptionIds, variants],
  );
  const hasCompleteSelection =
    isOriginal ||
    hasCompleteVariantSelection(variants, selections, selectionMode);
  const selectedStockLimit = isOriginal ? 1 : getSelectedStockLimit(selections);
  const printSoldOut =
    !isOriginal &&
    (variants.length === 0 ||
      !hasCompleteSelection ||
      selectedStockLimit === 0);
  const soldOut = originalSoldOut || printSoldOut;
  const finalUnitPrice = isOriginal
    ? product.pricing.finalPrice
    : getSelectedUnitPrice(product.pricing.finalPrice, selections);
  const previousPrice =
    product.pricing.basePrice === finalUnitPrice
      ? undefined
      : product.pricing.basePrice;
  const currencyCode = product.pricing.currencyCode || "INR";
  const selectedFulfillmentType = selections[0]?.variant.fulfillmentType;
  const displayName =
    (!isOriginal && product.content.printName) ||
    product.name?.replace(/\s*\(print\)$/i, "") ||
    "Untitled artwork";

  const updateVariant = (variantId: number, optionId: number) => {
    setSelectedOptionIds((current) =>
      selectionMode === "one-per-group"
        ? { ...current, [variantId]: optionId }
        : { [variantId]: optionId },
    );
    setProductQuantity(1);
    setErrorMessage(null);
  };

  const handleAddToCart = async () => {
    setErrorMessage(null);
    if (soldOut) {
      setErrorMessage("This artwork is no longer available.");
      return;
    }
    if (!hasCompleteSelection) {
      setErrorMessage(
        selectionMode === "one-per-group"
          ? "Please choose an option from every group."
          : "Please choose one print option.",
      );
      return;
    }

    try {
      const quantity = isOriginal ? 1 : productQuantity;
      if (authStatus === "authenticated") {
        await dispatch(
          addServerCartItem({
            productDbId: product.id,
            quantity,
            selectedVariants: isOriginal
              ? []
              : toCartVariantSelections(selections),
          }),
        ).unwrap();
      } else {
        await dispatch(
          addGuestCartItem({ product, quantity, selections }),
        ).unwrap();
      }
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1500);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <div className="product-purchase">
      <p className="product-purchase__eyebrow">
        {isOriginal
          ? "Original drawing · studio work"
          : "Fine art print · studio edition"}
      </p>
      <h1>{displayName}</h1>

      <div className="product-purchase__price-row">
        <div>
          <span className="product-purchase__price">
            {formatPriceToIntl(finalUnitPrice, currencyCode)}
          </span>
          {previousPrice !== undefined && previousPrice > finalUnitPrice && (
            <del>{formatPriceToIntl(previousPrice, currencyCode)}</del>
          )}
        </div>
        <span className="product-purchase__edition">
          {isOriginal ? "Original · 1 of 1" : "Print · open edition"}
        </span>
      </div>

      {isOriginal ? (
        <>
          <dl className="product-purchase__spec-grid">
            <div>
              <dt>Sheet</dt>
              <dd>{formatDimensions(product.artSpecs)}</dd>
            </div>
            <div>
              <dt>Framing</dt>
              <dd>
                {product.artSpecs?.framingStatus ||
                  (product.artSpecs?.isFramed ? "Framed" : "Unframed")}
              </dd>
            </div>
            <div>
              <dt>Signed</dt>
              <dd>
                {product.artSpecs?.isSigned
                  ? "Verso, by the artist"
                  : "Unsigned"}
              </dd>
            </div>
            <div>
              <dt>Certificate</dt>
              <dd>
                {product.artSpecs?.hasCertificate ? "Included" : "Not included"}
              </dd>
            </div>
          </dl>
          <div className="product-purchase__notice">
            <span aria-hidden="true" />
            <p>One sheet, one owner. Quantity is fixed at one.</p>
          </div>
        </>
      ) : (
        <fieldset className="product-purchase__variants">
          <legend>Choose an edition</legend>
          {variants.flatMap((variant) =>
            (variant.options || []).map((option) => {
              const selected = selectedOptionIds[variant.id] === option.id;
              const available = isVariantOptionAvailable(variant, option);
              const optionPrice = getSelectedUnitPrice(
                product.pricing.finalPrice,
                [{ variant, option }],
              );

              return (
                <button
                  key={`${variant.id}-${option.id}`}
                  type="button"
                  aria-pressed={selected}
                  disabled={!available}
                  onClick={() => updateVariant(variant.id, option.id)}
                  className="product-purchase__variant"
                >
                  <span>
                    <strong>
                      {variant.label || option.value || "Print edition"}
                    </strong>
                    <small>
                      {getVariantDescription(variant, option, product.artSpecs)}
                    </small>
                  </span>
                  <span>{formatPriceToIntl(optionPrice, currencyCode)}</span>
                  {!available && <em>Sold out</em>}
                </button>
              );
            }),
          )}
        </fieldset>
      )}

      {!isOriginal && (
        <div className="product-purchase__quantity-row">
          <div className="product-purchase__quantity">
            <button
              type="button"
              onClick={() =>
                setProductQuantity(Math.max(1, productQuantity - 1))
              }
              disabled={soldOut || productQuantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <span>{productQuantity}</span>
            <button
              type="button"
              onClick={() =>
                setProductQuantity(
                  selectedStockLimit == null
                    ? productQuantity + 1
                    : Math.min(selectedStockLimit, productQuantity + 1),
                )
              }
              disabled={
                soldOut ||
                (selectedStockLimit != null &&
                  productQuantity >= selectedStockLimit)
              }
              aria-label="Increase quantity"
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
          <p>
            {selectedFulfillmentType === 0
              ? "Available to download after checkout"
              : "Printed to order in 3 working days"}
          </p>
        </div>
      )}

      {errorMessage && (
        <p role="alert" className="product-purchase__error">
          {errorMessage}
        </p>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={cartStatus === "loading" || soldOut}
        className={`product-purchase__cta${added ? " is-added" : ""}`}
      >
        {soldOut
          ? "Sold out"
          : added
            ? "Added"
            : isOriginal
              ? "Acquire original"
              : "Add print to cart"}
      </button>
      <p className="product-purchase__assurance">
        {isOriginal
          ? "Held for 30 minutes at checkout"
          : "Ships worldwide · Secure checkout"}
      </p>

      <ProductDetails product={product} isOriginal={isOriginal} />
    </div>
  );
}
