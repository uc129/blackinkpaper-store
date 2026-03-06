import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={cn(
                "h-10 w-full rounded-md border border-muted bg-background px-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary",
                className
            )}
            {...props}
        />
    )
}
