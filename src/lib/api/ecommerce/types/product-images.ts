
export type ProductImageType = {
    id: number;
    productId: number;
    altText: string;           // Crucial for SEO and Accessibility
    isPrimary: boolean;        // The "Thumbnail" or "Cover"
    displayOrder: number;      // To sort images in a gallery
    
    // Cloudinary Specifics
    publicId: string;          // Store the Cloudinary ID to perform transformations
    baseUrl: string;           // Original high-res URL
    
    // Technical Metadata (Helps prevent layout shift)
    aspectRatio: number;       // e.g., 1.5 (Width/Height)
    width: number;
    height: number;
    placeholderUrl?: string;   // A tiny 10px base64 or blurred image for "blur-up" effect
}


