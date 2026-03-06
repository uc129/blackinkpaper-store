import { ProductCategoryType } from "@/lib/api/ecommerce/types/product-categories"
import { ProductSubCategoryType } from "@/lib/api/ecommerce/types/product-subcategory-type"
import { ProductType } from "@/lib/api/ecommerce/types/product-type"

export type ProductShopCategory = "digital" | "print"

export const mockProductCategories: ProductCategoryType[] = [
    {
        id: 1,
        name_code: "black_and_white",
        name: "BlackAndWhite",
        print_name: "Black & White",
        description: "Original black and white prints, handmade and signed by the artist.",
        isActive: true,
        isFeatured: true,
        slug: "black-and-white",
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",
    },
    {
        id: 2,
        name_code: "city_scapes",
        name: "Cityscapes",
        print_name: "City Scapes",
        description: "Vibrant color prints that explore the interplay of light and shadow.",
        isActive: true,
        isFeatured: false,
        slug: "city-scapes",
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",

    },
    {
        id: 3,
        name_code: "commissions",
        name: "Commissions",
        print_name: "Commissions",
        description: "Custom commissioned works created specifically for clients.",
        isActive: true,
        isFeatured: true,
        slug: "commissions",
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",

    }, {
        id: 4,
        name_code: "travel_art",
        name: "Travel Art",
        print_name: "Travel Art",
        description: "Art inspired by travels and adventures around the world.",
        isActive: true,
        isFeatured: false,
        slug: "travel-art",
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",

    },
    {
        id: 5,
        name_code: "travel_art",
        name: "Travel Art",
        print_name: "Travel Art",
        description: "Art inspired by travels and adventures around the world.",
        isActive: true,
        isFeatured: false,
        slug: "travel-art",
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",

    },

]


export const mockProductSubCategories: ProductSubCategoryType[] = [
    {
        id: 1,
        categoryId: 1,
        name_code: "jazz_portraits",
        name: "Jazz Portraits",
        print_name: "Jazz Portraits",
        description: "Black and white prints that capture the essence of jazz musicians.",
        isActive: true,
        isFeatured: true,
        slug: "jazz-portraits",
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",


    },
    {
        id: 2,
        categoryId: 4,
        name_code: "street_photography",
        name: "Street Photography",
        print_name: "Street Photography",
        description: "Black and white prints that explore the raw energy of urban life.",
        isActive: true,
        isFeatured: false,
        slug: "street-photography",
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",

    }
]


export const mockProducts: ProductType[] = [
    {
        id: 1,
        product_id: "prod_001_black_and_white_001_name_dont_feed_the_pandas",
        name_code: "dont_feed_the_pandas",
        name: "Don't Feed the Pandas",
        print_name: "Don't Feed the Pandas",
        description: "A vibrant color print that captures the interplay of light and shadow in a bustling city.",
        price_rupees: 4500.00,
        price_paisa: 450000.00,
        categoryId: 1,
        subCategoryId: 1,
        coverImageUrl: "https://picsum.photos/2400/1800?random=1",
        headerImageUrl: "https://picsum.photos/1200/1800?random=1",
        allImageUrls: [
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
        ],
        isAvailable: true,
        isFeatured: true,
        slug: "dont-feed-the-pandas",
        productShopCategory: "print"
    },
    {
        id: 2,
        product_id: "prod_002_travel_art_001_name_sunset_over_the_himalayas",
        name_code: "sunset_over_the_himalayas",
        name: "Sunset Over the Himalayas",
        print_name: "Sunset Over the Himalayas",
        description: "A stunning print that captures the breathtaking beauty of a sunset over the Himalayan mountains.",
        price_rupees: 6000.00,
        price_paisa: 600000.00,
        categoryId: 4,
        subCategoryId: 2,
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",
        headerImageUrl: "https://picsum.photos/1200/1800?random=1",

        allImageUrls: [
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
        ],
        isAvailable: true,
        isFeatured: false,
        slug: "sunset-over-the-himalayas",
        productShopCategory: "print"

    },
    {
        id: 3,
        product_id: "prod_003_commissions_001_name_custom_portrait_of_a_loved_one",
        name_code: "custom_portrait_of_a_loved_one",
        name: "Custom Portrait of a Loved One",
        print_name: "Custom Portrait of a Loved One",
        description: "A personalized commissioned piece that captures the essence of a loved one in a unique and artistic way.",
        price_rupees: 10000.00,
        price_paisa: 1000000.00,
        categoryId: 3,
        subCategoryId: 2,
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",
        headerImageUrl: "https://picsum.photos/1200/1800?random=1",

        allImageUrls: [
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
        ],
        isAvailable: true,
        isFeatured: true,
        slug: "custom-portrait-of-a-loved-one",
        productShopCategory: "digital"

    },
    {
        id: 4,
        product_id: "prod_004_city_scapes_001_name_night_lights_of_new_york",
        name_code: "night_lights_of_new_york",
        name: "Night Lights of New York",
        print_name: "Night Lights of New York",
        description: "A vibrant color print that captures the dazzling night lights of New York City.",
        price_rupees: 5500.00,
        price_paisa: 550000.00,
        categoryId: 2,
        subCategoryId: 1,
        coverImageUrl: "https://picsum.photos/1200/1800?random=1",
        headerImageUrl: "https://picsum.photos/1200/1800?random=1",

        allImageUrls: [
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
            "https://picsum.photos/1200/1800?random=1",
        ],
        isAvailable: true,
        isFeatured: false,
        slug: "night-lights-of-new-york",
        productShopCategory: "digital"

    }
]



