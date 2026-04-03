'use client'

import { ProductType } from "@/lib/api/ecommerce/types/product-type"
import { useAppDispatch } from "@/lib/hooks/redux-hooks"
import { addItem, SelectedVariant } from "@/lib/redux/store/slices/cartSlice"
import { useState } from "react"

type Props = {
    product: ProductType;
    onAdd?: (e: React.MouseEvent) => boolean;
    quantity: number;
    selectedVariants?: SelectedVariant[]
}

export default function AddToCartButton({ product, quantity, onAdd, selectedVariants }: Props) {
    const dispatch = useAppDispatch()
    const [added, setAdded] = useState(false)

    const handleAdd = (event: React.MouseEvent) => {
        // Validation check from parent
        const isValidated = onAdd ? onAdd(event) : true
        if (!isValidated) return;

        dispatch(addItem({
            id: product.id,
            name: product.name,
            price:product.pricing.final_price!,
            quantity: quantity,
            currencyCode: "INR",
            selectedVariants: selectedVariants,
            basePrice:product.pricing.base_price!,
        }));

        setAdded(true)
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <button
            onClick={handleAdd}
            className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${added
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-neutral-800"
                }`}
        >
            <span className={`transition-opacity duration-200 ${added ? "opacity-0" : "opacity-100"}`}>
                Add to Cart
            </span>

            <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${added ? "opacity-100" : "opacity-0"}`}>
                ✓ Added
            </span>
        </button>
    )
}