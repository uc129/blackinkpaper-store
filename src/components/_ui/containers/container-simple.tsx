import { useBreakpoints } from "@/lib/hooks/breakpoints";
import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};
/**
 * ContainerSimple
 *
 * A lightweight layout container used to wrap page sections.
 * Applies the `container-simple` class - which sets flex direction to column, centers content, and applies horizontal padding.
 *
 * Example:
 * ```tsx
 * <ContainerSimple className="py-12">
 *   <HeroSection />
 * </ContainerSimple>
 * ```
 */


export function ContainerSimple({ children, className = "" }: ContainerProps) {
    return (
        <div
            className={`container-simple ${className}`}>
            {children}
        </div>
    );
}

/**
 * ContainerSimpleInline
 *
 * A lightweight layout container used to wrap page sections.
 * Applies the `container-simple-inline` class - which sets flex direction to row, centers content, and applies horizontal padding.
 *
 * Example:
 * ```tsx
 * <ContainerSimple className="py-12">
 *   <HeroSection />
 * </ContainerSimple>
 * ```
 */



export function ContainerSimpleInLine({ children, className = "" }: ContainerProps) {
    return (
        <div
            className={`container-simple-inline ${className}`}>
            {children}
        </div>
    );
}



export function Grid({ children, className = "" }: ContainerProps) {
    return (
        <div className={`grid ${className}`}>
            {children}
        </div>
    )
}