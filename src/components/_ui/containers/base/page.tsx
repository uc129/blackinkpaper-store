// components/layout/Page.tsx

import { ReactNode } from "react";

type PageProps = {
    children: ReactNode;
    className?: string;
};

export default function Page({ children, className = "" }: PageProps) {
    return (
        <div className={`page ${className}`}>
            {children}
        </div>
    );
}