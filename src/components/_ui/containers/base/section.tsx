// components/layout/Section.tsx

import { ReactNode } from "react";

type SectionProps = {
    children: ReactNode;
    fullHeight?: boolean;
    centered?: boolean;
    className?: string;
};

export default function Section({
    children,
    fullHeight = false,
    centered = false,
    className = "",
}: SectionProps) {
    return (
        <section
            className={`section
                ${fullHeight ? "min-h-screen" : ""} 
                ${centered ? "items-center justify-center" : ""}
                ${className}
        `}>
            {children}
        </section>
    );
}