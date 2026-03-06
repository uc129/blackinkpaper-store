'use client';

import Image from 'next/image';
import { useState } from 'react';

type ArtImageProps = {
    src: string;
    alt: string;
    fallbackSrc?: string;
    priority?: boolean;
    className?: string;
    sizes?: string;
};

export default function ArtImage({
    src,
    alt,
    fallbackSrc = '/images/fallback-art.jpg',
    priority = false,
    className = '',
    sizes = '(max-width: 768px) 100vw, 50vw',
}: ArtImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isError, setIsError] = useState(false);

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            <Image
                src={imgSrc}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                quality={90}
                placeholder="blur"
                blurDataURL="/images/blur-placeholder.jpg"
                onError={() => {
                    if (!isError) {
                        setIsError(true);
                        setImgSrc(fallbackSrc);
                    }
                }}
                className="object-cover object-center transition-opacity duration-300"
            />
        </div>
    );
}