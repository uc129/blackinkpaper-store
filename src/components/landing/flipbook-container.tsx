'use client'

import { useState } from "react";
import { Artwork } from "@/lib/Artwork";
import EmblaCarouselSimple, { GalleryItem } from "../_ui/interactive/embla/carousel-simple";
import { Heading } from "../_ui/primitives/heading"
import { mockProducts } from "@/lib/api/ecommerce/mockdata/mock-product-data"
import ArtLightboxModal from "../_ui/interactive/modals/art-lightbox-modal";
import { Button } from "../_ui/primitives/button";
import { ContainerSimple } from "../_ui/containers/container-simple";

const artViewerArtworks: Artwork[] = mockProducts.slice(0, 5).map(prod => ({
    title: prod.name,
    description: prod.description,
    src: prod.coverImageUrl,
    artist: "Utkarsh Chaudhary",
    year: "2023",
    medium: "Digital Print",
    slug: prod.slug
}));

const galleryItems: GalleryItem[] = artViewerArtworks.map(art => ({
    src: art.src,
    thumb: art.src,
    title: art.title,
    subHtml: `<div class="art-caption">${art.title} by ${art.artist} (${art.year}) - ${art.medium}</div>`,
    download: false,
    alt: `${art.title} by ${art.artist}`,
    poster: art.src,
    slideName: art.title,
    slug: art.slug
}));

export const LandingFlipbookContainer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleCarouselImageClick = (index: number) => {
        setSelectedIndex(index);
        setIsOpen(true);
    };



    return (
        <ContainerSimple className="my-16 w-full">

            <Heading size="h2" className="text-center mb-12 breathe-room">
                Experience The Art Of Storytelling With Our Interactive Flipbook
            </Heading>

            <EmblaCarouselSimple
                slides={galleryItems}
                onImageClick={(index) => handleCarouselImageClick(index)}
                options={{}}
                delay={8000}
                actionButton={{ label: "Shop Now", hrefPrefix: "/store/shop/product" }}
            />

            <ArtLightboxModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                items={galleryItems}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

            />
        </ContainerSimple>
    );
};