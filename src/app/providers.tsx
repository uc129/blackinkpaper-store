// app/providers.tsx
"use client";

import { makeStore, AppStore } from "@/lib/redux/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";
// import { initializeCount } from '../lib/features/counter/counterSlice'


function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        // Initialize using a slicer for the feature
        // storeRef.current.dispatch(initializeCount(count))
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <StoreProvider>{children}</StoreProvider>
        </>
    );
}