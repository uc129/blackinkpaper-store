import { useEffect, useState } from "react";

type Breakpoints = {
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
    isWide: boolean;
};

export function useBreakpoints(): Breakpoints {
    const [bp, setBp] = useState<Breakpoints>({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false,
        isWide: false
    });

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;

            setBp({
                isMobile: width < 640,
                isTablet: width >= 640 && width < 1024,
                isLaptop: width >= 1024 && width < 1280,
                isDesktop: width >= 1280 && width < 1536,
                isWide: width >= 1536
            });
        };

        update();
        window.addEventListener("resize", update);

        return () => window.removeEventListener("resize", update);
    }, []);

    return bp;
}