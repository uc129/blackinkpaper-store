"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback"
import type { GalleryImage } from "./ProductDetailGallery"

type Props = {
    images: GalleryImage[]
    isOpen: boolean
    selectedIndex: number
    onSelect: (index: number) => void
    onClose: () => void
}

function preloadGalleryImage(src: string) {
    if (typeof window === "undefined") {
        return Promise.resolve()
    }

    return new Promise<void>((resolve) => {
        const image = new window.Image()
        let resolved = false

        const finish = () => {
            if (!resolved) {
                resolved = true
                resolve()
            }
        }

        image.onload = finish
        image.onerror = finish
        image.src = src

        if (image.decode) {
            image.decode().then(finish).catch(() => undefined)
        }
    })
}

export default function ProductLightbox({
    images,
    isOpen,
    selectedIndex,
    onSelect,
    onClose,
}: Props) {
    const dialogRef = useRef<HTMLDivElement>(null)
    const currentImage = images[selectedIndex]
    const hasMultipleImages = images.length > 1
    const [displayedImage, setDisplayedImage] = useState<GalleryImage | undefined>(currentImage)
    const [imageVersion, setImageVersion] = useState(0)
    const adjacentImages = useMemo(() => {
        if (!hasMultipleImages) {
            return []
        }

        const previousIndex = (selectedIndex - 1 + images.length) % images.length
        const nextIndex = (selectedIndex + 1) % images.length

        return [images[previousIndex], images[nextIndex]].filter(
            (image, index, list) => image && list.findIndex((item) => item.src === image.src) === index,
        )
    }, [hasMultipleImages, images, selectedIndex])

    useEffect(() => {
        if (!isOpen && currentImage) {
            setDisplayedImage(currentImage)
        }
    }, [currentImage, isOpen])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        dialogRef.current?.focus()

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen || !currentImage) {
            return
        }

        if (displayedImage?.src === currentImage.src) {
            return
        }

        let cancelled = false

        preloadGalleryImage(currentImage.src).then(() => {
            if (cancelled) {
                return
            }

            setDisplayedImage(currentImage)
            setImageVersion((version) => version + 1)
        })

        return () => {
            cancelled = true
        }
    }, [currentImage, displayedImage?.src, isOpen])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        adjacentImages.forEach((image) => {
            void preloadGalleryImage(image.src)
        })
    }, [adjacentImages, isOpen])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const selectPreviousImage = () => {
            onSelect((selectedIndex - 1 + images.length) % images.length)
        }

        const selectNextImage = () => {
            onSelect((selectedIndex + 1) % images.length)
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }

            if (!hasMultipleImages) {
                return
            }

            if (event.key === "ArrowLeft") {
                selectPreviousImage()
            }

            if (event.key === "ArrowRight") {
                selectNextImage()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [hasMultipleImages, images.length, isOpen, onClose, onSelect, selectedIndex])

    if (!isOpen || !currentImage || !displayedImage) {
        return null
    }

    const selectPreviousImage = () => {
        onSelect((selectedIndex - 1 + images.length) % images.length)
    }

    const selectNextImage = () => {
        onSelect((selectedIndex + 1) % images.length)
    }

    return (
        <div
            className="fixed inset-0 z-[80] flex flex-col bg-[#161312]/95 text-white backdrop-blur-md animate-[product-lightbox-fade_180ms_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-label="Product image viewer"
            tabIndex={-1}
            ref={dialogRef}
            onClick={onClose}
        >
            <div className="flex min-h-0 flex-1 flex-col" onClick={(event) => event.stopPropagation()}>
                <div
                    className="flex items-center justify-between gap-4"
                    style={{
                        paddingTop: "max(env(safe-area-inset-top), 1.5rem)",
                        paddingRight: "max(env(safe-area-inset-right), 1.5rem)",
                        paddingBottom: "1rem",
                        paddingLeft: "max(env(safe-area-inset-left), 1.5rem)",
                    }}
                >
                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                        {selectedIndex + 1} / {images.length}
                    </p>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 leading-none text-white transition hover:bg-white hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-white/70 [&>svg]:block"
                        aria-label="Close image viewer"
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>

                <div
                    className="relative flex min-h-0 flex-1 items-center justify-center"
                    style={{
                        paddingRight: "max(env(safe-area-inset-right), 1.5rem)",
                        paddingBottom: "1rem",
                        paddingLeft: "max(env(safe-area-inset-left), 1.5rem)",
                    }}
                >
                    {hasMultipleImages && (
                        <button
                            type="button"
                            onClick={selectPreviousImage}
                            className="absolute z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 leading-none text-white transition hover:bg-white hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-white/70 [&>svg]:block"
                            style={{ left: "max(env(safe-area-inset-left), 1.5rem)" }}
                            aria-label="View previous image"
                        >
                            <ChevronLeft size={22} aria-hidden="true" />
                        </button>
                    )}

                    <div className="relative h-full max-h-[72vh] w-full max-w-6xl">
                        <ImageWithFallback
                            key={`${displayedImage.src}-${imageVersion}`}
                            src={displayedImage.src}
                            alt={displayedImage.alt ?? ""}
                            fill
                            priority
                            sizes="100vw"
                            className="object-contain animate-[product-lightbox-image_140ms_ease-out]"
                        />
                    </div>

                    {hasMultipleImages && (
                        <button
                            type="button"
                            onClick={selectNextImage}
                            className="absolute z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 leading-none text-white transition hover:bg-white hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-white/70 [&>svg]:block"
                            style={{ right: "max(env(safe-area-inset-right), 1.5rem)" }}
                            aria-label="View next image"
                        >
                            <ChevronRight size={22} aria-hidden="true" />
                        </button>
                    )}
                </div>

                {hasMultipleImages && (
                    <div
                        className="mx-auto flex max-w-full gap-3 overflow-x-auto"
                        style={{
                            paddingRight: "max(env(safe-area-inset-right), 1.5rem)",
                            paddingBottom: "max(env(safe-area-inset-bottom), 1.25rem)",
                            paddingLeft: "max(env(safe-area-inset-left), 1.5rem)",
                        }}
                    >
                        {images.map((image, index) => (
                            <button
                                key={`${image.src}-${index}`}
                                type="button"
                                onClick={() => onSelect(index)}
                                className={`relative size-16 shrink-0 overflow-hidden border bg-white/5 transition sm:size-20 ${
                                    selectedIndex === index
                                        ? "border-white opacity-100"
                                        : "border-white/15 opacity-55 hover:opacity-100"
                                }`}
                                aria-label={`View image ${index + 1}`}
                                aria-current={selectedIndex === index ? "true" : undefined}
                            >
                                <ImageWithFallback
                                    src={image.thumb ?? image.src}
                                    alt={image.alt ?? ""}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
