'use client'

import { useState, useRef } from "react"
import LightGallery from "lightgallery/react"
import { LightGallery as ILightGallery } from "lightgallery/lightgallery"
import lgZoom from "lightgallery/plugins/zoom"
import lgThumbnail from "lightgallery/plugins/thumbnail"


import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"
import { ImageWithFallback } from "@/components/_ui/images/imagewithfallback"

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
    const galleryRef = useRef<ILightGallery | null>(null)

    return (
        <div className={`grid gap-4 ${className}`}>

            {/* Thumbnails */}
            <div className="col-12 2xl:col-2  flex justify-center lg:justify-start 2xl:flex-col gap-3">
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
                className="min-w-0 w-full h-[50vh] lg:h-[80vh] col-12 2xl:col-9  relative rounded-2xl overflow-clip bg-sky-100 p-4"
                onClick={() => galleryRef.current?.openGallery(active)}
            >
                <ImageWithFallback
                    src={images[active].src}
                    alt={images[active].alt ?? ""}
                    fill
                    className="object-cover  rounded-2xl overflow-clip"
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