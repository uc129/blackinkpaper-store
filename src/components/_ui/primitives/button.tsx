import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary: "bg-primary text-secondary hover:hover1 shadow-md",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
                ghost: "bg-transparent hover:bg-surface text-primary",
                outline: "border border-primary text-primary hover:bg-surface",
                destructive: "bg-error text-secondary hover:bg-red-700",
                link: "text-link hover:text-gray-500",

                pill: "bg-secondary hover:bg-hover1 text-primary border border-secondary rounded-full  tracking-wide",
                pillDark: "bg-primary hover:bg-hover2 text-primary border border-primary-foreground rounded-full  tracking-wide",

                icon: "bg-transparent hover:bg-hover1 rounded-md",
                iconSolid: "bg-primary text-secondary hover:bg-hover1 rounded-md",
                iconOutline: "border border-primary hover:bg-hover1 rounded-md"
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
