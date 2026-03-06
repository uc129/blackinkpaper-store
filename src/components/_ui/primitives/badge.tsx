import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
    {
        variants: {
            variant: {
                default: "bg-primary text-white",
                secondary: "bg-secondary text-secondary-foreground",
                outline: "border border-primary text-primary",
            },
        },
        defaultVariants: { variant: "default" },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

export function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
