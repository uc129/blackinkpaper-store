import { cn } from "@/lib/utils"

export function Textarea({
    className,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className={cn(
                "w-full rounded-md border border-muted bg-background px-3 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary",
                className
            )}
            {...props}
        />
    )
}
