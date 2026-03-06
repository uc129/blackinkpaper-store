// components/layout/Section.tsx

import { ReactNode } from "react";

type SectionProps = {
    children: ReactNode;
    fullHeight?: boolean;
    centered?: boolean;
    className?: string;
    customPadding?: { r: string, l: string, t: string, b: string }
};

export default function Section({
    children,
    fullHeight = false,
    centered = false,
    className = "",
    customPadding
}: SectionProps) {
    return (
        <section
            className={`section ${fullHeight ? "min-h-screen" : ""} ${centered ? "items-center justify-center" : ""} ${className}`}
            style={
                customPadding &&
                {
                    paddingLeft: customPadding.l!,
                    paddingRight: customPadding.r!,
                    paddingTop: customPadding.t!,
                    paddingBottom: customPadding.b!
                }
            }>
            {children}
        </section>
    );
}