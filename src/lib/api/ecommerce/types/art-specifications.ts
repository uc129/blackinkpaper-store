export type ArtSpecifications = {
    // Physical Art
    dimensions?: { width: number; height: number; unit: "cm" | "in" };
    weight_grams?: number; // Needed for shipping calculation
    isFramed?: boolean;
    material?: string; // e.g., "300gsm Cotton Paper"
    
    // Digital Art
    fileFormat?: string; // e.g., "TIFF", "High-Res JPG"
    resolution_dpi?: number;
    pixelDimensions?: string; // e.g., "6000x4000"
}