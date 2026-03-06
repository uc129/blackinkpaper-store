import { cn } from "@/lib/utils"

export const PageShell = ({ className, ...props }: any) => (
    <div className={cn("mx-auto max-w-6xl px-4", className)} {...props} />
)

export const Section = ({ className, ...props }: any) => (
    <section className={cn("py-8", className)} {...props} />
)

export const SectionHeader = ({ className, ...props }: any) => (
    <header className={cn("mb-6", className)} {...props} />
)

export const SectionContent = ({ className, ...props }: any) => (
    <div className={cn("", className)} {...props} />
)

export const Container = ({ className, ...props }: any) => (
    <div className={cn("mx-auto max-w-3xl", className)} {...props} />
)