"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ContainerSimple } from "../containers/container-simple"

const ERROR_IMG_SRC =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4="
type CaptionAlign = "left" | "center" | "right"
type CaptionPosition = "below" | "overlay"

type Props = {
    src: string
    alt: string
    width?: number
    height?: number

    caption?: string
    captionAlign?: CaptionAlign
    captionSize?: string
    captionColor?: string
    captionDecoration?: React.CSSProperties
    captionPosition?: CaptionPosition

    className?: string
    style?: React.CSSProperties,
    onClick?: (event: React.MouseEvent) => void
}

export function ImageWithCaption({
    src,
    alt,
    width,
    height,
    caption,
    captionAlign = "center",
    captionSize = "1rem",
    captionColor = "#444",
    captionDecoration,
    captionPosition = "below",
    className,
    style,
    onClick
}: Props) {
    const [didError, setDidError] = useState(false)

    const alignmentMap: Record<CaptionAlign, string> = {
        left: "left",
        center: "center",
        right: "right",
    }

    const captionStyles: React.CSSProperties = {
        fontSize: captionSize,
        color: captionColor,
        textAlign: alignmentMap[captionAlign] as any,
        marginTop: captionPosition === "below" ? "0.75rem" : undefined,
        ...captionDecoration,
    }

    const handleClick = (event: React.MouseEvent) => {
        if (didError) {
            setDidError(false)
        }
        if (onClick) {
            onClick(event)
        }
    }

    const imageElement = (
        <Image
            src={didError ? ERROR_IMG_SRC : src}
            alt={didError ? "Error loading image" : alt}
            // fill={true}
            // sizes="100vw"
            width={width}
            height={height}
            className="rounded-lg"
            onError={() => setDidError(true)}
            priority={false}
            onClick={handleClick}

        />
    )

    return (
        <ContainerSimple
            className={`relative inline-block ${className ?? ""}`}
        >
            {imageElement}

            {caption && captionPosition === "overlay" && (
                <figure
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-4 rounded-md backdrop-blur-md"
                    style={{ ...captionStyles, color: "#fff" }}
                >
                    {caption}
                </figure>
            )}

            {caption && captionPosition === "below" && (
                <div className="py-4" style={captionStyles}>{caption}</div>
            )}
        </ContainerSimple>
    )
}