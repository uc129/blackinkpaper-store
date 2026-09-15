'use client'

import { useState } from "react";
import { Artwork } from "@/lib/Artwork";
import EmblaCarouselSimple, { GalleryItem } from "../_ui/interactive/embla/carousel-simple";
import { Heading } from "../_ui/primitives/heading"
import ArtLightboxModal from "../_ui/interactive/modals/art-lightbox-modal";
import { ContainerSimple } from "../_ui/containers/container-simple";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";

function toGalleryItems(products: ProductSummaryDto[]): GalleryItem[] {
const artViewerArtworks: Artwork[] = products.filter(prod => prod.media.coverImageUrl || prod.media.headerImageUrl).slice(0, 5).map(prod => ({
    title: prod.name || "Artwork",
    description: "",
    src: prod.media.coverImageUrl || prod.media.headerImageUrl || "",
    artist: "Ria Mukharjee",
    year: "2023",
    medium: "Digital Print",
    slug: prod.slug || ""
}));

return artViewerArtworks.map(art => ({
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
}

export const LandingFlipbookContainer = ({ products }: { products: ProductSummaryDto[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const galleryItems = toGalleryItems(products);

    const handleCarouselImageClick = (index: number) => {
        setSelectedIndex(index);
        setIsOpen(true);
    };



    return (
        <ContainerSimple className="my-16 w-full">

            <Heading size="h2" className="text-center mb-12 breathe-room">
                Experience The Art Of Storytelling With Our Interactive Flipbook
            </Heading>

            {galleryItems.length > 0 ? (
                <>
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
                </>
            ) : (
                <div className="border border-dashed border-[var(--border)] bg-[var(--paper)] p-8 text-center text-[var(--ink-soft)]">
                    No product images returned by the server.
                </div>
            )}
        </ContainerSimple>
    );
};
