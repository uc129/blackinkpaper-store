export type ProductCategoryType = {
    id: number;
    name_code: string;
    name: string;
    print_name: string;
    description: string;
    isActive: boolean;
    isFeatured: boolean;
    slug: string;
    coverImageUrl?: string;
}