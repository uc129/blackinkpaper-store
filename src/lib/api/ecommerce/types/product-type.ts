import { ProductShopCategory } from "@/mocks/blog/mock-product-data";
import { ProductCategoryType } from "./product-categories";
import { ProductSubCategoryType } from "./product-subcategory-type";

export type ProductVariantOption = {
    value: string;
    priceModifier?: number; // e.g., 50 (adds 50 to base price)
    absolutePrice?: number; // e.g., 1050 (overrides base price)
}

export type ProductVariant ={
    label:string,
    options:ProductVariantOption[]
}

export type ProductType = {
    id: number;
    product_id: string;
    name_code: string;
    name: string;
    print_name: string;
    description: string;
    base_price_rupees?:number
    base_price_paisa?:number
    price_rupees: number;
    price_paisa: number;
    categoryId: number;
    subCategoryId: number;
    coverImageUrl: string;
    headerImageUrl: string;
    allImageUrls: string[];
    isAvailable: boolean;
    isFeatured: boolean;
    slug: string;
    productShopCategory: ProductShopCategory;
    variants?:ProductVariant[]
}

export type ProductDetailsType = ProductType & {
    category: ProductCategoryType;
    subCategory: ProductSubCategoryType;
}