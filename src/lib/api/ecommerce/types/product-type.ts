import { ProductShopCategory } from "@/mocks/blog/mock-product-data";
import { ProductCategoryType } from "./product-categories";
import { ProductSubCategoryType } from "./product-subcategory-type";

export type ProductType = {
    id: number;
    product_id: string;
    name_code: string;
    name: string;
    print_name: string;
    description: string;
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
    variants?: Record<string, string>
}





export type ProductDetailsType = ProductType & {
    category: ProductCategoryType;
    subCategory: ProductSubCategoryType;
}