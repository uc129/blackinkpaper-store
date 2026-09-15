"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { QuantitySelector } from "@/components/ecommerce/QuantitySelector";
import { ProductSpecifications } from "@/components/ecommerce/store/ProductSpecifications";
import { ProductText } from "@/components/ecommerce/store/ProductText";
import { VariantSelector } from "@/components/ecommerce/store/VariantSelector";
import type { ProductResponseDto } from "@/lib/api/storefront/types";
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
import { addServerCartItem } from "@/lib/redux/store/slices/cartSlice";

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return "This artwork could not be added to your cart. Please try again.";
}

export default function HandleCartLogicComponent({
  product,
}: {
  product: ProductResponseDto;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const variants = product.variants || [];
  const isOriginal = product.artSpecs?.isOriginal === true;
  const originalSoldOut = isOriginal && product.stats.stockQuantity === 0;
  const [productQuantity, setProductQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedOptionIds, setSelectedOptionIds] = useState(() =>
    createDefaultSelections(variants),
  );

  const selections = useMemo(
    () => getSelectedOptions(variants, selectedOptionIds),
    [selectedOptionIds, variants],
  );
  const hasCompleteSelection =
    isOriginal || hasCompleteVariantSelection(variants, selections);
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

  const updateVariant = (variantId: number, optionId: number) => {
    setSelectedOptionIds((current) => ({ ...current, [variantId]: optionId }));
    setProductQuantity(1);
    setErrorMessage(null);
  };

  const handleAddToCart = async () => {
    setErrorMessage(null);
    if (authStatus !== "authenticated") {
      router.push(`/login?next=/store/shop/product/${product.slug}`);
      return;
    }
    if (soldOut) {
      setErrorMessage("This artwork is no longer available.");
      return;
    }
    if (!hasCompleteSelection) {
      setErrorMessage("Please choose an option from every group.");
      return;
    }

    try {
      await dispatch(
        addServerCartItem({
          productDbId: product.id,
          quantity: isOriginal ? 1 : productQuantity,
          selectedVariants: isOriginal
            ? []
            : toCartVariantSelections(selections),
        }),
      ).unwrap();
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1500);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <ContainerSimple className="gap-5">
      <ProductText
        large
        title={product.name || "Untitled artwork"}
        titleClassNames="font-display text-[var(--ink)] font-semibold leading-tight"
        currentPrice={finalUnitPrice}
        oldPrice={previousPrice}
        displayPrice
        currencyCode={product.pricing.currencyCode || "INR"}
        description={
          product.content.description || product.content.shortDescription || ""
        }
        notificationText={
          isOriginal
            ? "Original · 1 of 1"
            : product.taxonomy.isFeatured
              ? "Featured print"
              : "Print"
        }
      />

      <ProductSpecifications
        artSpecs={product.artSpecs}
        isOriginal={isOriginal}
      />

      {isOriginal ? (
        <div className="store-surface flex items-center justify-between gap-4 p-4 text-sm">
          <div>
            <p className="font-display text-lg text-[var(--ink)]">
              A unique, one-of-a-kind piece
            </p>
            <p className="mt-1 text-[var(--ink-soft)]">
              Quantity is fixed at one.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--ink)] px-4 py-2 font-medium text-[var(--ink)]">
            1 of 1
          </span>
        </div>
      ) : (
        <>
          {variants.map((variant) => (
            <VariantSelector
              key={variant.id}
              label={variant.label || "Option"}
              options={(variant.options || []).map((option) => ({
                id: option.id,
                label: option.value || "Option",
                disabled: !isVariantOptionAvailable(variant, option),
              }))}
              value={selectedOptionIds[variant.id]}
              onChange={(optionId) => updateVariant(variant.id, optionId)}
            />
          ))}

          <div className="w-fit">
            <QuantitySelector
              onChange={setProductQuantity}
              value={productQuantity}
              max={selectedStockLimit}
              disabled={soldOut}
              classNames="justify-between rounded-full border border-[var(--ink)] bg-transparent px-4 py-2"
            />
          </div>

          {selectedStockLimit !== null && selectedStockLimit > 0 && (
            <p className="text-sm text-[var(--ink-soft)]">
              {selectedStockLimit} available for the selected options
            </p>
          )}
        </>
      )}

      {errorMessage && (
        <p
          role="alert"
          className="border-l-2 border-[var(--danger)] pl-4 text-sm text-[var(--danger)]"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={cartStatus === "loading" || soldOut}
        className={`relative overflow-hidden rounded-full px-8 py-4 font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-[var(--paper-deep)] disabled:text-[var(--muted)] ${
          added
            ? "bg-[var(--accent-1)] text-white"
            : "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]"
        }`}
      >
        {soldOut
          ? "Sold out"
          : added
            ? "Added"
            : authStatus === "authenticated"
              ? isOriginal
                ? "Acquire Original"
                : "Add Print to Cart"
              : "Login to Add to Cart"}
      </button>
    </ContainerSimple>
  );
}
