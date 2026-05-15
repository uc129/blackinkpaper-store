// app/providers.tsx
"use client";

import { makeStore, AppStore } from "@/lib/redux/store/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { initMessageListener } from "redux-state-sync";
import { fetchCart } from "@/lib/redux/store/slices/cartSlice";
import { hydrateAuth } from "@/lib/redux/store/slices/authSlice";


export  function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
        initMessageListener(storeRef.current);
    }

    useEffect(() => {
        if (!storeRef.current) return;

        storeRef.current.dispatch(hydrateAuth()).then((result) => {
            if (hydrateAuth.fulfilled.match(result) && result.payload.accessToken) {
                storeRef.current?.dispatch(fetchCart());
            }
        });
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <StoreProvider>
                {children}
            </StoreProvider>
        </>
    );
}
