"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { QuantitySelector } from "@/components/ecommerce/QuantitySelector";
import { VariantSelector } from "@/components/ecommerce/store/VariantSelector";
import { ProductText } from "@/components/ecommerce/store/ProductText";
import type { ProductResponseDto } from "@/lib/api/storefront/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { addServerCartItem } from "@/lib/redux/store/slices/cartSlice";

type SelectedOption = {
  productVariantId: number;
  productVariantOptionId: number;
  label: string;
  value: string;
  priceModifier: number;
  absolutePrice?: number | null;
};

export default function HandleCartLogicComponent({ product }: { product: ProductResponseDto }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const [productQuantity, setProductQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variantOptions = useMemo(
    () =>
      (product.variants || []).flatMap((variant) =>
        variant.options.map((option) => ({
          id: option.id,
          productVariantId: variant.id,
          productVariantOptionId: option.id,
          label: variant.label || option.value || "Option",
          value: option.value || "",
          priceModifier: option.priceModifier || 0,
          absolutePrice: option.absolutePrice ?? variant.absolutePrice ?? null,
        })),
      ),
    [product.variants],
  );
  const [selection, setSelection] = useState<SelectedOption | null>(
    () => variantOptions[0] ?? null,
  );

  const finalUnitPrice = selection?.absolutePrice ?? product.pricing.finalPrice + (selection?.priceModifier ?? 0);
  const previousPrice = product.pricing.basePrice === finalUnitPrice ? undefined : product.pricing.basePrice;

  const updateVariant = (optionId: number) => {
    const option = variantOptions.find((item) => item.productVariantOptionId === optionId);
    if (!option) return;
    setSelection(option);
  };

  const handleAddToCart = async () => {
    if (authStatus !== "authenticated") {
      router.push(`/login?next=/store/shop/product/${product.slug}`);
      return;
    }

    if (variantOptions.length > 0 && !selection) {
      alert("Please select a variant");
      return;
    }

    await dispatch(
      addServerCartItem({
        productDbId: product.id,
        quantity: productQuantity,
        selectedVariants: selection
          ? [
              {
                productVariantId: selection.productVariantId,
                productVariantOptionId: selection.productVariantOptionId,
              },
            ]
          : [],
      }),
    ).unwrap();

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
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
        description={product.content.description || product.content.shortDescription || ""}
        notificationText={product.taxonomy.isFeatured ? "Featured" : undefined}
      />

      <div className="w-fit">
        <QuantitySelector
          onChange={setProductQuantity}
          value={productQuantity}
          classNames="justify-between rounded-full border border-[var(--ink)] bg-transparent px-4 py-2"
        />
      </div>

      {variantOptions.length > 0 && (
        <VariantSelector
          label="Variant"
          options={variantOptions.map((option) => ({
            id: option.productVariantOptionId,
            label: option.label,
          }))}
          value={selection?.productVariantOptionId}
          onChange={updateVariant}
        />
      )}

      {selection && (
        <p className="text-sm font-medium text-[var(--ink-soft)]">
          Selected: <span className="text-[var(--ink)]">{selection.label}</span>
        </p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={cartStatus === "loading"}
        className={`relative overflow-hidden rounded-full px-8 py-4 font-medium transition-all duration-300 disabled:opacity-60 ${
          added ? "bg-[var(--accent-1)] text-white" : "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]"
        }`}
      >
        {added ? "Added" : authStatus === "authenticated" ? "Add to Cart" : "Login to Add to Cart"}
      </button>
    </ContainerSimple>
  );
}
