'use client'
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { QuantitySelector } from "@/components/ecommerce/QuantitySelector";
import AddToCartButton from "@/components/ecommerce/store/AddToCartButton";
import { VariantSelector } from "@/components/ecommerce/store/VariantSelector";
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { useEffect, useState } from "react";



export default function HandleCartLogicComponent({ product }: { product: ProductType }) {
    const [productQuantity, setProductQuantity] = useState(0);
    const [hasVariants, setHasVariants] = useState(false);
    const [selection, setSelection] = useState({
        quantity: 1,
        variants: {} as Record<string, string>
    })

    useEffect(() => {
        if (!product) return;
        if (product.variants) setHasVariants(true);
    })


    //Event Handlers
    const updateVariants = (key: string, value: string) => {
        setSelection(prev => ({ ...prev, [key]: value }))
    }

    const HandleQuantityChange = (quantity: number) => {
        if (quantity < 0) return;
        setProductQuantity(quantity);
    }


    // helpers
    const allVariantsSelected = () =>
        Object.keys(product.variants!).every(
            key => selection.variants[key]
        )

    const handleSubmit = () => {
        if (product.variants) {
            const variantsCheck = allVariantsSelected();
            if (!variantsCheck) {
                alert("Please select all required options")
                return;
            }
        }
    }







    return (
        <ContainerSimple className="">
            <QuantitySelector onChange={HandleQuantityChange} value={0} />
            <VariantSelector
                label="Size"
                options={["S", "M", "L", "XL"]}
                value={selection.variants.size}
                onChange={(v) => updateVariants("size", v)}
            />
            <VariantSelector
                label="Color"
                options={["Black", "White", "Blue"]}
                value={selection.variants.color}
                onChange={(v) => updateVariants("color", v)}
            />
            <AddToCartButton product={product} onAdd={handleSubmit} />

        </ContainerSimple>
    )

}