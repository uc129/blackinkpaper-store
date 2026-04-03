"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
const ERROR_IMG_SRC = "https://picsum.photos/300"

type Props = ImageProps & {
    fallbackSrc?: string;
};

export function ImageWithFallback({
    fallbackSrc = ERROR_IMG_SRC,
    onError,
    src,
    className,
    ...rest
}: Props) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image className={className}
            {...rest}
            src={imgSrc}
            onError={(e) => {
                if (imgSrc !== fallbackSrc) {
                    setImgSrc(fallbackSrc);
                }
                onError?.(e);
            }}
        />
    );
}