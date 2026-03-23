"use client";
import {ContainerSimple,Grid} from "@/components/_ui/containers/container-simple";
import { GlassShowcase } from "@/components/_ui/interactive/glass-showcase";
import { QuantitySelector } from "@/components/ecommerce/QuantitySelector";
import AddToCartButton from "@/components/ecommerce/store/AddToCartButton";
import { VariantSelector } from "@/components/ecommerce/store/VariantSelector";
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { useState } from "react";

export default function HandleCartLogicComponent({product}: {product: ProductType}) {
  const [productQuantity, setProductQuantity] = useState(1);
  const [selection, setSelection] = useState({
    quantity: 1,
    variants:product.variants?.reduce((acc, v) => {
          const firstOption = v.options[0];
          return {...acc,[v.label]: {value: firstOption.value, priceModifier: firstOption.priceModifier || 0}}}, {} as 
          Record<string, { value: string; priceModifier: number }>,) || {},
  });

  const updateVariants = (key: string,value: string,priceModifier: number = 0,) => {
    setSelection((prev) => ({...prev,variants: {...prev.variants,[key]: { value, priceModifier }}}));
  };

  const validateCartItem = () => {
    if (product.variants && product.variants.length > 0) {
      const isComplete = product.variants.every(
        (v) => selection.variants[v.label],
      );
      if (!isComplete) {
        alert("Please select all required options");
        return false;
      }
    }
    return true;
  };

  // Inside HandleCartLogicComponent
  const basePrice = product.base_price;

  // Sum up all modifiers from our state
  const totalModifiers = Object.values(selection.variants).reduce(
    (acc, curr) => acc + curr.priceModifier,
    0,
  );

  const finalUnitPrice = basePrice + totalModifiers;

  // Format variants for the Redux CartItem type
  const formattedVariantsForCart = Object.entries(selection.variants).map(
    ([label, data]) => ({
      label,
      choice: data.value,
      priceModifier: data.priceModifier,
    }),
  );

  return (
    <ContainerSimple className="gap-3">
      <GlassShowcase>
        <QuantitySelector
          onChange={setProductQuantity}
          value={productQuantity}
          classNames="w-full justify-between glassmorph glass-noise rounded-xl"
        />
      </GlassShowcase>

      {product.variants && product.variants.length > 0 && (
        <Grid>
          {product.variants.map((variant) => (
            <VariantSelector 
              key={variant.label} label={variant.label}
              // Extract just the strings for the UI options
              options={variant.options.map((op) => op.value)}
              // Access the nested value property
              value={selection.variants[variant.label]?.value || ""}
              onChange={(v) => {
                // Find the full option object to get its priceModifier
                const optionData = variant.options.find((opt) => opt.value === v);
                updateVariants( variant.label, v, optionData?.priceModifier || 0);
              }}
              classNames="col-12 lg:col-6"
            />
          ))}
        </Grid>
      )}

      <AddToCartButton
        product={{
          ...product,
          final_price: finalUnitPrice, // The calculated total
          base_price: basePrice, // The original price
        }}
        quantity={productQuantity}
        selectedVariants={formattedVariantsForCart}
        onAdd={validateCartItem}
      />
    </ContainerSimple>
  );
}
