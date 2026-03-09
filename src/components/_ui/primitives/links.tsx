import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = keyof typeof Icons;

type LinkWithIconProps = {
    href: string;
    text: string;
    icon: IconName;
    iconSize?: number;
    iconWeight?: number;
    iconPosition?: "left" | "right";
    className?: string;
    iconClassName?: string;
};

export function LinkWithIcon({
    href,
    text,
    icon,
    iconSize = 16,
    iconWeight = 2,
    iconPosition = "left",
    className,
    iconClassName
}: LinkWithIconProps) {

    const Icon = Icons[icon] as LucideIcon;

    return (
        <Link href={href} className={cn("inline-flex items-center gap-1", className)}>
            {iconPosition === "left" && (
                <Icon size={iconSize} strokeWidth={iconWeight} className={iconClassName} />
            )}
            <span>{text}</span>
            {iconPosition === "right" && (
                <Icon size={iconSize} strokeWidth={iconWeight} className={iconClassName} />
            )}
        </Link>
    );
}






export type LinkSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type BoldTextVariants = "normal" | "bold" | "extrabold" | "black";

const sizeClasses: Record<LinkSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
};

export const NavLink = ({
    text,
    sup,
    href,
    brackets = true,
    linkSize = "sm",
    underline = true,
    className = "",
    boldVariant = "normal",
}: {
    text: string;
    sup?: string;
    href: string;
    brackets?: boolean;
    linkSize?: LinkSize;
    underline?: boolean;
    className?: string;
    boldVariant?: BoldTextVariants;
}) => {
    return (
        <Link
            href={href}
            className={`
        relative group w-fit

        ${sizeClasses[linkSize]}
        transition-colors duration-300
        flex items-start gap-1
        ${className}
        font-${boldVariant}

      `}
        >
            <span className={`relative `}>
                {text}

                {underline && (
                    <span
                        className="
              absolute left-0 -bottom-1
              h-px w-0
              bg-current
              transition-all duration-300 ease-out
              group-hover:w-full
            "
                    />
                )}
            </span>

            {sup && sup!=="" && (
                <span className="text-[9px] translate-y-[-0.4em] opacity-70">
                    {brackets ? `(${sup})` : sup}
                </span>
            )}
        </Link>
    );
};


export const ExternalLink = ({ text, href }: { text: string; href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs tracking-widest hover:text-gray-600 transition-colors"
    >
        {text}
    </a>
);


