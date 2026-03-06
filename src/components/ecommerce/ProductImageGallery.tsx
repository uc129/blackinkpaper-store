"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImageGallery({ images }: { images: string[] }) {
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-col gap-space-4">
            <div className="relative w-full h-96 rounded-card overflow-hidden">
                <Image
                    src={images[active]}
                    alt="Product Image"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex gap-space-2 overflow-x-auto">
                {images.map((img, idx) => (
                    <button
                        key={img}
                        onClick={() => setActive(idx)}
                        className={`relative w-20 h-20 rounded-card overflow-hidden border 
              ${idx === active ? "border-accent" : "border-surface-variant"}`}
                    >
                        <Image src={img} alt="" fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
