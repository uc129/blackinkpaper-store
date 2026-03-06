'use client'
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import Section from "@/components/_ui/containers/base/section";
import { AddToCartButton } from "@/components/ecommerce/AddToCartButton";
import { QuantitySelector } from "@/components/ecommerce/QuantitySelector";
import { ProductText } from "@/components/ecommerce/store/ProductText";
import { VariantSelector } from "@/components/ecommerce/store/VariantSelector";
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import { useState } from "react";


export default function HandleCartLogicComponent({ product }: { product: ProductType }) {
    const [productQuantity, setProductQuantity] = useState(0);
    const [variants, setVariants] = useState({
        size: "",
        color: ""
    })

    const updateVariants = (key: string, value: string) => {
        setVariants(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const HandleQuantityChange = (quantity: number) => {
        if (quantity < 0) return;
        setProductQuantity(quantity);
    }
    return (<>
        <Section customPadding={{ l: "0", r: "0", t: "0", b: "0" }}>
            <ContainerSimple className="h-full justify-end">

                <ProductText classNames="h-3/4 w-fit mx-auto"
                    title={product.name}
                    titleClassNames="text-title-sm text-text-primary font-semibold line-clamp-2"
                    currentPrice={product.price_rupees}
                    oldPrice={product.price_rupees - 1000}
                    displayPrice
                    currencyCode="INR"
                    description={product.description}
                    notificationText="SALE" />

                <QuantitySelector onChange={HandleQuantityChange} value={0} />

                <VariantSelector
                    label="Size"
                    options={["S", "M", "L", "XL"]}
                    value={variants.size}
                    onChange={(v) => updateVariants("size", v)}
                />

                <VariantSelector
                    label="Color"
                    options={["Black", "White", "Blue"]}
                    value={variants.color}
                    onChange={(v) => updateVariants("color", v)}
                />
                <AddToCartButton product={product} />

            </ContainerSimple>
        </Section>
    </>)

}