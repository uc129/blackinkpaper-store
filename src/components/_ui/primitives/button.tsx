import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-60 cursor-pointer disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary: "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] rounded-full",
                secondary: "bg-[var(--paper)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--paper-deep)] rounded-full",
                ghost: "bg-transparent text-[var(--ink)] hover:underline underline-offset-5",
                outline: "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] rounded-full",
                destructive: "bg-[var(--danger)] text-white hover:bg-red-800 rounded-full",
                link: "text-[var(--ink)] hover:underline underline-offset-5",

                pill: "bg-[var(--ink)] hover:bg-[var(--ink-soft)] text-[var(--paper)] border border-[var(--ink)] rounded-full",
                pillDark: "bg-[var(--paper)] hover:bg-[var(--paper-deep)] text-[var(--ink)] border border-[var(--border)] rounded-full",

                icon: "bg-transparent text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-full",
                iconSolid: "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] rounded-full",
                iconOutline: "border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-full"
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-10 px-4 text-base",
                lg: "h-12 px-6 text-lg",
                icon: "h-10 w-10",
                pill: "h-8 px-4 text-xs",
                pill_lg: "h-18 w-54 px-6 text-md"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md"
        },
    },

);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
    href?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({ className, variant, size, onClick, href, ...props }: ButtonProps) {
    if (href) {
        return <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
    }
    return <button onClick={onClick} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
