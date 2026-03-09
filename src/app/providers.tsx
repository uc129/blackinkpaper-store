// app/providers.tsx
"use client";

import { CartItem, hydrateCart } from "@/lib/redux/store/slices/cartSlice";
import { makeStore, AppStore } from "@/lib/redux/store/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { initMessageListener } from "redux-state-sync";


export  function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
        initMessageListener(storeRef.current);
    }

    useEffect(() => {
        if (!storeRef.current) return;

        // 1. Load existing data from LocalStorage
        const savedCart:any = localStorage.getItem("cart_storage");
        console.log("Saved Cart- Providers", savedCart)
        if (savedCart) {
            try {
                const items:CartItem[] = JSON.parse(savedCart);
                storeRef.current.dispatch(hydrateCart(items))
            } catch (e) {
                console.error("Failed to parse cart from storage", e);
            }
        }

        // 2. Subscribe to changes: Save to LocalStorage whenever the cart changes
        const unsubscribe = storeRef.current.subscribe(() => {
            const state = storeRef.current?.getState();
            if (state?.cart) {
                localStorage.setItem("cart_storage", JSON.stringify(state.cart.cartItems));
            }
        });

        return () => unsubscribe();
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <StoreProvider>{children}</StoreProvider>
        </>
    );
}