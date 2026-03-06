'use client'

import { use, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import Image from 'next/image'
import './embla.css'
import { NextButton, PrevButton } from './carousel-simple-buttons'
import { ImageWithCaption } from '../../images/imageWithCaption'
import { Button } from '../../primitives/button'

export type GalleryItem = {
    src: string
    alt?: string
    thumb?: string
    title?: string
    // Optional additional metadata for captions or other uses
    [key: string]: any
    subHtml?: string
    download?: boolean
    poster?: string
    slideName?: string
    slug?: string,
}

type Props = {
    slides: GalleryItem[]
    options?: EmblaOptionsType,
    delay?: number
    onImageClick?: (index: number, item: GalleryItem, event: React.MouseEvent) => void
    actionButton?: {
        label: string
        hrefPrefix: string
    }

}

export default function EmblaCarousel({ slides, options, delay, onImageClick, actionButton }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: 'center',
            loop: true,
            skipSnaps: false,
            dragFree: false,
            ...options,
        },
        [
            Autoplay({ delay: delay || 8000, stopOnInteraction: false }),
            ClassNames(),
        ]
    )

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap())
        }
        onSelect() // Set initial index
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])



    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((slide, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__inner">
                                <ImageWithCaption
                                    src={slide.src}
                                    alt={slide.alt || ''}
                                    width={840}
                                    height={800}
                                    className="embla__slide__img"
                                    caption={slide.alt || ''}
                                    onClick={(event) => onImageClick && onImageClick(index, slide, event)}
                                // priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">

                <PrevButton onClick={scrollPrev} />

                {actionButton && actionButton.hrefPrefix && actionButton.label && (
                    <Button variant="pill" size="pill_lg"
                        href={actionButton.hrefPrefix && slides[currentIndex].slug ?
                            `${actionButton.hrefPrefix}/${slides[currentIndex].slug}` : `/store`}  >
                        {actionButton.label || 'Shop Now'}
                    </Button>
                )}

                <NextButton onClick={scrollNext} />
            </div>
        </section>
    )
}