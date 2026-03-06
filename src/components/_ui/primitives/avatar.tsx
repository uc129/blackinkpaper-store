import Image from "next/image"
import { cn } from "@/lib/utils"

export function Avatar({
    src,
    alt,
    className,
}: {
    src: string
    alt: string
    className?: string
}) {
    return (
        <Image
            src={src}
            alt={alt}
            width={40}
            height={40}
            className={cn("rounded-full object-cover", className)}
        />
    )
}
