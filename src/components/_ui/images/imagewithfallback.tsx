"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
const ERROR_IMG_SRC =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyIgc3Ryb2tlPSIjMzMyZDJkIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMzUiIGZpbGw9IiNmN2Y2ZjMiIHN0cm9rZS13aWR0aD0iMy43Ij48cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgcng9IjYiLz48cGF0aCBkPSJtMTYgNTggMTYtMTggMzIgMzIiLz48Y2lyY2xlIGN4PSI1MyIgY3k9IjM1IiByPSI3Ii8+PC9zdmc+="

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
