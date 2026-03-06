"use client";

import { Button } from "../_ui/primitives/button";


export function AddToCartButton({ product }: { product: any }) {
    // const cart = useCart();

    return (
        <Button
            // onClick={() => cart.add(product)}
            variant="primary"
            size="lg"
            className="w-full"
        >
            Add to Cart
        </Button>
    );
}


