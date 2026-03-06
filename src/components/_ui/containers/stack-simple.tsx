// components/layout/Stack.tsx

import { ReactNode } from "react";

type StackSimpleProps = {
    children: ReactNode;
    gap?: "sm" | "md" | "lg";
    className?: string;
};

const gapMap = {
    sm: "gap-4",
    md: "gap-8",
    lg: "gap-16",
};

export default function StackSimple({
    children,
    gap = "md",
    className = "",
}: StackSimpleProps) {
    return (
        <div className={`flex flex-col ${gapMap[gap]} ${className}`}>
            {children}
        </div>
    );
}