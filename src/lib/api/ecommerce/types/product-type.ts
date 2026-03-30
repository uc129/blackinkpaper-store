import { ArtSpecifications } from "./art-specifications";
import { ProductCategoryType, ProductSubCategoryType } from "./product-categories";
import { ProductImageType } from "./product-images";
import { ProductTag } from "./product-tags";
import { ProductVariant } from "./product-variants";

export type ProductType = {
    id: number;
    product_id: string; // SKU / Business ID
    name: string;
    slug: string;
    artistId: string;
    // --- Descriptive Content ---
    content: {
        name_code: string;
        print_name: string;
        description: string;
        short_description?: string;
    };
    // --- Pricing (Financial Group) ---
    pricing: {
        base_price: number;
        final_price: number;
        currency_code: string;
        base_price_low_denomination: number;
        final_price_low_denomination: number;
    };
    // --- Organization & Hierarchy ---
    taxonomy: {
        categoryId: number;
        subCategoryId: number;
        isFeatured: boolean;
        isAvailable: boolean;
        tags: ProductTag[];
    };
    // --- Media & Assets ---
    media: {
        coverImageUrl: string;
        headerImageUrl: string;
        allImageUrls: string[]; // Legacy/Simple
        allProductImages: ProductImageType[]; // Detailed metadata
    };
    // --- Domain Specifics ---
    specs: ArtSpecifications;
    variants: ProductVariant[];
    isUsingStandardVariants: boolean;
    // --- Social & Feedback ---
    stats: {
        averageRating: number;
        reviewCount: number;
        stockQuantity?: number;
    };
    // --- Audit Metadata ---
    audit: {
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
    };
}

export type ProductDetailsType = ProductType & {
    category: ProductCategoryType;
    subCategory: ProductSubCategoryType;
}