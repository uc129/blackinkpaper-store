

// From API
export type ProductVariantSubCategoryDefault = {  
    subCategoryId: number;
    standardVariants: ProductVariant[]; 
}

// UI 
export type ProductVariantOption = {
    id: string; 
    value: string;
    priceModifier?: number; 
    absolutePrice?: number; 
    stockQuantity?: number;
    //Industry standard fields for hybrid products
    fulfillmentType: "digital" | "physical"; 
    sku: string; // e.g., "FOREST-DIGITAL" or "FOREST-PRINT-A4"
    weightGrams?: number; // Only for physical variants
}

export type ProductVariant ={
    label:string,
    options:ProductVariantOption[]
}
