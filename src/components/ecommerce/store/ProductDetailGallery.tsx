'use client'

import { useState, useRef } from "react"
import LightGallery from "lightgallery/react"
import { LightGallery as ILightGallery } from "lightgallery/lightgallery"
import lgZoom from "lightgallery/plugins/zoom"
import lgThumbnail from "lightgallery/plugins/thumbnail"


import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"
import { ImageWithCaption } from "@/components/_ui/images/imageWithCaption"
import Image from "next/image"
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback"

export type GalleryImage = {
    src: string
    thumb?: string
    alt?: string
}

type Props = {
    images: GalleryImage[]
    className?: string,
    maxHeightTwClasses?: string
}

export default function ProductDetailGallery({ images, className, maxHeightTwClasses }: Props) {

    const [active, setActive] = useState(0)
    const galleryRef = useRef<ILightGallery | null>(null)

    return (
        <div className={`w-full xl:w-1/2 grid gap-4 ${className}`}>

            {/* Thumbnails */}
            <div className="col-12 lg:col-2 flex justify-center lg:justify-start lg:flex-col gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`relative w-fit overflow-hidden rounded-md border transition 
                            ${active === i ? "border-gray-400" : "border-transparent hover:border-neutral-300"}`}
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
            <div
                className="col-12 lg:col-9 min-w-0 w-full relative rounded-2xl overflow-clip"
                onClick={() => galleryRef.current?.openGallery(active)}
            >
                <ImageWithFallback
                    src={images[active].src}
                    alt={images[active].alt ?? ""}
                    width={1000}
                    height={1500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                    className="w-full h-auto min-h-full max-h-[80vh] object-contain rounded-2xl overflow-clip"
                />
            </div>


            {/* Hidden lightbox */}
            <LightGallery
                dynamic
                dynamicEl={images.map(img => ({
                    src: img.src,
                    thumb: img.thumb ?? img.src
                }))}
                plugins={[lgZoom, lgThumbnail]}
                onInit={(detail) => {
                    galleryRef.current = detail.instance
                }}
                elementClassNames="hidden"
            />

        </div>

    )
}