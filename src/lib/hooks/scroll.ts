import { useEffect, useState } from "react";

export function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const update = () => setScrollY(window.scrollY);

        window.addEventListener("scroll", update);
        return () => window.removeEventListener("scroll", update);
    }, []);

    return scrollY;
}
