import { useEffect, useRef } from "react";

export function useThrottle(callback: () => void, delay: number) {
    const lastRun = useRef(0);

    useEffect(() => {
        const handler = () => {
            const now = Date.now();

            if (now - lastRun.current >= delay) {
                callback();
                lastRun.current = now;
            }
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, [callback, delay]);
}