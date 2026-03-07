import { cn } from "@/lib/utils";
import React from "react";

const headingStyles = {
    h1: "text-h1",
    h1Thin: "text-h1",
    h2: "text-h2",
    h2Thin: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
    h6: "text-h6",

    caption: "text-caption",
    display: "text-display md:text-display",
    displayCaption: "text-display-caption",
    displayThin: "text-display-thin",
    title: "text-title",
    titleSmall: "text-title-sm text-xl lg:text-2xl 2xl:text-3xl",
    titleLarge: "text-title-lg text-5xl lg:text-6xl 2xl:text-7xl"

} as const;

type Size = keyof typeof headingStyles;
type TagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
    as?: TagType;
    size: Size;
    className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
    return (
        <Tag className={cn(headingStyles[size ?? "h2"], className)} {...props} />
    );
}
