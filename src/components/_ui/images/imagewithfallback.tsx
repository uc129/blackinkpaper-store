"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { mockPicSumImages } from "@/mocks/images/picsum";
const ERROR_IMG_SRC = mockPicSumImages[2]

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