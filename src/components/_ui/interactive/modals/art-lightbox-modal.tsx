'use client'

import { useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "../embla/carousel-simple";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    items: GalleryItem[];
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

export default function ArtLightboxModal({
    isOpen,
    onClose,
    items,
    selectedIndex,
    setSelectedIndex
}: Props) {

    const currentItem = items[selectedIndex];

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            const prevIndex = (selectedIndex - 1 + items.length) % items.length;
            const nextIndex = (selectedIndex + 1) % items.length;
            if (e.key === "ArrowRight") {
                setSelectedIndex(nextIndex);
            }
            if (e.key === "ArrowLeft") {
                setSelectedIndex(prevIndex);
            }
        };

        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, items.length, onClose, setSelectedIndex]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md animate-fadeIn flex flex-col"
            onClick={onClose} // Backdrop click
        >
            {/* Modal Content Wrapper */}
            <div
                className="flex flex-col flex-1"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
            >

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 text-white text-3xl opacity-70 hover:opacity-100 transition"
                >
                    ×
                </button>

                {/* Main Image */}
                <div className="flex-1 flex items-center justify-center px-8 pt-20">
                    <div className="relative w-full max-w-5xl h-[70vh] transition-all duration-300 ease-out">
                        <Image
                            src={currentItem.src}
                            alt={currentItem.alt || ""}
                            fill
                            className="object-contain rounded-xl shadow-2xl"
                            priority
                        />
                    </div>
                </div>

                {/* Caption */}
                <div className="text-center text-gray-300 mb-6 text-sm tracking-wide">
                    {currentItem.title || currentItem.alt || `Image ${selectedIndex + 1} of ${items.length}`}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-4 overflow-x-auto px-10 pb-8 max-w-[70%] mx-auto">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative w-24 h-24 shrink-0 rounded-md overflow-hidden border transition-all duration-200 ${index === selectedIndex
                                ? "border-white scale-105"
                                : "border-white/20 opacity-60 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt || ""}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}