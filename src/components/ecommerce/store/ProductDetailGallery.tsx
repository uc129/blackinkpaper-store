'use client'

import { useState } from "react"
import { Expand } from "lucide-react"
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback"
import ProductLightbox from "./ProductLightbox"




export type GalleryImage = {
    src: string
    thumb?: string
    alt?: string
}

type Props = {
    images: GalleryImage[]
    className?: string,
}

export default function ProductDetailGallery({ images, className }: Props) {

    const [active, setActive] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const activeImage = images[active]

    if (!activeImage) {
        return (
            <div className={`flex h-[50vh] min-h-96 w-full items-center justify-center bg-[var(--paper-deep)] text-sm text-[var(--muted)] ${className ?? ""}`}>
                No product images returned by the server.
            </div>
        )
    }

    return (
        <div className={`grid gap-4 ${className}`}>

            {/* Thumbnails */}
            <div className="col-12 2xl:col-2 flex justify-center lg:justify-start 2xl:flex-col gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`relative w-fit overflow-hidden border transition
                            ${active === i ? "border-[var(--ink)]" : "border-transparent hover:border-[var(--border)]"}`}
                        aria-label={`View product image ${i + 1}`}
                        aria-current={active === i ? "true" : undefined}
                    >
                        <ImageWithFallback
                            src={img.thumb ?? img.src}
                            alt={img.alt ?? ""}
                            width={100}
                            height={100}
                            className="object-cover max-h-24"
                        />
                    </button>
                ))}
            </div>


            {/* Main artwork */}
            <button
                type="button"
                className="group min-w-0 w-full h-[50vh] lg:h-[72vh] col-12 2xl:col-9 relative overflow-clip bg-[var(--paper-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-4 focus:ring-offset-[var(--primary)]"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Open product image viewer"
            >
                <ImageWithFallback
                    src={activeImage.src}
                    alt={activeImage.alt ?? ""}
                    fill
                    className="object-cover overflow-clip"
                    sizes="(min-width: 1348px) 75vw, 100vw"
                />
                <span className="absolute right-4 top-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/80 leading-none text-[var(--ink)] opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100 [&>svg]:block">
                    <Expand size={18} aria-hidden="true" />
                </span>
            </button>

            <ProductLightbox
                images={images}
                isOpen={isLightboxOpen}
                selectedIndex={active}
                onSelect={setActive}
                onClose={() => setIsLightboxOpen(false)}
            />

        </div>

    )
}
