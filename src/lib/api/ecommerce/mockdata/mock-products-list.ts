import { ProductType } from "../types/product-type";


export const product1: ProductType = {
    id: 101,
    product_id: "BP-ORG-001",
    name: "The Obsidian Lion",
    slug: "obsidian-lion-ballpoint-original",
    artistId: 2,
    content: {
        name_code: "OBSIDIAN_LION",
        print_name: "The Obsidian Lion - Original Drawing",
        description: "A hyper-realistic portrait of a male lion, created over 120 hours using exclusively black ballpoint pens on archival paper.",
        short_description: "Original hyper-realistic ballpoint pen lion portrait."
    },
    pricing: {
        base_price: 1200,
        final_price: 1200,
        currency_code: "USD",
        base_price_low_denomination: 120000,
        final_price_low_denomination: 120000,
    },
    taxonomy: {
        categoryId: 1,
        subCategoryId: 2,
        isFeatured: true,
        isAvailable: true,
        tagIds:[1,2],
    },
    media: {
        coverImageUrl: "https://picsum.photos/400",
        headerImageUrl: "https://picsum.photos/400",
        allImageUrls: ["https://picsum.photos/400", "https://picsum.photos/400"],
        allProductImages:[]
    },
    specs: {
        dimensions: { width: 18, height: 24, unit: "in" },
        weight_grams: 800,
        isFramed: true,
        material: "300gsm Acid-Free Cotton Paper",
    },
    variants: [],
    isUsingStandardVariants: false,
    stats: {
        averageRating: 5.0,
        reviewCount: 12,
        stockQuantity: 1,
    },
    audit: {
        createdAt: "2026-01-15T10:00:00Z",
        createdBy: "admin_1",
        updatedAt: "2026-03-01T14:20:00Z",
        updatedBy: "admin_1",
    }
};

export const product2: ProductType = {
    id: 102,
    product_id: "BP-VAR-77",
    name: "Metropolitan Shadows",
    slug: "metropolitan-shadows-cityscape",
    artistId: 1,
    content: {
        name_code: "METRO_SHADOWS",
        print_name: "Metropolitan Shadows Cityscape",
        description: "A cross-hatched urban landscape capturing the grit and light of NYC at dusk.",
        short_description: "Ballpoint pen cityscape sketch."
    },
    pricing: {
        base_price: 45,
        final_price: 45,
        currency_code: "USD",
        base_price_low_denomination: 4500,
        final_price_low_denomination: 4500,
    },
    taxonomy: {
        categoryId: 4,
        subCategoryId: 3,
        isFeatured: false,
        isAvailable: true,
        tagIds:[3,4]
    },
    media: {
        coverImageUrl: "https://picsum.photos/400",
        headerImageUrl: "https://picsum.photos/400",
        allImageUrls: ["https://picsum.photos/400", "https://picsum.photos/400"],
        allProductImages:[]
    },
    specs: {
        fileFormat: "TIFF",
        resolution_dpi: 600,
        pixelDimensions: "9000x6000"
    },
    isUsingStandardVariants: true,
    variants: [
        {
            label: "Format & Size",
            options: [
                {
                    id: "v1",
                    value: "Digital Download (High Res)",
                    priceModifier: 0,
                    fulfillmentType: "digital",
                    sku: "METRO-SHAD-DIGI",
                    stockQuantity: 999
                },
                {
                    id: "v2",
                    value: "A3 Physical Print",
                    priceModifier: 35,
                    fulfillmentType: "physical",
                    sku: "METRO-SHAD-A3",
                    weightGrams: 250,
                    stockQuantity: 50
                }
            ]
        }
    ],
    stats: {
        averageRating: 4.8,
        reviewCount: 45,
    },
    audit: {
        createdAt: "2026-02-10T09:00:00Z",
        createdBy: "system",
        updatedAt: "2026-02-10T09:00:00Z",
        updatedBy: "system",
    }
};

export const product3: ProductType = {
    id: 103,
    product_id: "BP-SCI-009",
    name: "The Blue Anatomy",
    slug: "blue-anatomy-hand-study",
    artistId: 2,
    content: {
        name_code: "BLUE_ANATOMY",
        print_name: "Anatomical Study of the Hand",
        description: "Classic blue Bic ballpoint pen sketch on vintage-toned paper. Part of the 'Daily Anatomy' series.",
        short_description: "Blue ballpoint anatomical study."
    },
    pricing: {
        base_price: 180,
        final_price: 162, // 10% discount applied
        currency_code: "USD",
        base_price_low_denomination: 18000,
        final_price_low_denomination: 16200,
    },
    taxonomy: {
        categoryId: 3,
        subCategoryId: 1,
        isFeatured: true,
        isAvailable: true,
        tagIds:[5,6]
    },
   media: {
        coverImageUrl: "https://picsum.photos/400",
        headerImageUrl: "https://picsum.photos/400",
        allImageUrls: ["https://picsum.photos/400", "https://picsum.photos/400"],
        allProductImages:[]
    },
    specs: {
        dimensions: { width: 8, height: 10, unit: "in" },
        weight_grams: 150,
        isFramed: false,
        material: "Moleskine Paper",
    },
    variants: [],
    isUsingStandardVariants: false,
    stats: {
        averageRating: 4.9,
        reviewCount: 8,
        stockQuantity: 1,
    },
    audit: {
        createdAt: "2026-03-15T11:15:00Z",
        createdBy: "artist_15",
        updatedAt: "2026-03-20T16:45:00Z",
        updatedBy: "artist_15",
    }
};

export const product4: ProductType = {
    id: 104,
    product_id: "BP-STM-042",
    name: "Mechanical Heart",
    slug: "mechanical-heart-steampunk-pen",
    artistId: 1,
    content: {
        name_code: "MECH_HEART",
        print_name: "The Mechanical Heart - Ink Study",
        description: "A complex anatomical heart integrated with clockwork gears, rendered with fine-liner and ballpoint pen.",
        short_description: "Steampunk style anatomical heart drawing."
    },
    pricing: {
        base_price: 250,
        final_price: 250,
        currency_code: "USD",
        base_price_low_denomination: 25000,
        final_price_low_denomination: 25000,
    },
    taxonomy: {
        categoryId: 2,
        subCategoryId: 1,
        isFeatured: true,
        isAvailable: true,
        tagIds: [7,8],
    },
    media: {
        coverImageUrl: "https://picsum.photos/400",
        headerImageUrl: "https://picsum.photos/400",
        allImageUrls: ["https://picsum.photos/400", "https://picsum.photos/400"],
        allProductImages:[]
    },
    specs: {
        dimensions: { width: 12, height: 12, unit: "in" },
        weight_grams: 300,
        isFramed: false,
        material: "Heavyweight Bristol Board",
    },
    variants: [],
    isUsingStandardVariants: false,
    stats: {
        averageRating: 4.7,
        reviewCount: 15,
        stockQuantity: 5,
    },
    audit: {
        createdAt: "2026-01-20T14:00:00Z",
        createdBy: "admin_2",
        updatedAt: "2026-01-20T14:00:00Z",
        updatedBy: "admin_2",
    }
};

export const product5: ProductType = {
    id: 105,
    product_id: "BP-POR-109",
    name: "Wrinkles of Wisdom",
    slug: "wrinkles-wisdom-portrait",
    artistId: 2,
    content: {
        name_code: "WISDOM_PORTRAIT",
        print_name: "Wrinkles of Wisdom - Original Portrait",
        description: "A close-up study of an elderly man's face, utilizing light pressure shading to create depth and texture.",
        short_description: "Detailed ballpoint portrait on toned paper."
    },
    pricing: {
        base_price: 500,
        final_price: 450,
        currency_code: "USD",
        base_price_low_denomination: 50000,
        final_price_low_denomination: 45000,
    },
    taxonomy: {
        categoryId: 1,
        subCategoryId: 3,
        isFeatured: false,
        isAvailable: true,
        tagIds: [9,10],
    },
   media: {
        coverImageUrl: "https://picsum.photos/400",
        headerImageUrl: "https://picsum.photos/400",
        allImageUrls: ["https://picsum.photos/400", "https://picsum.photos/400"],
        allProductImages:[]
    },
    specs: {
        dimensions: { width: 11, height: 14, unit: "in" },
        weight_grams: 450,
        isFramed: true,
        material: "Toned Tan Strathmore Paper",
    },
    variants: [
        {
            label:"FRAME COLOR",
            options:[
                {id:'1', fulfillmentType:"physical", sku:"BP-POR-109-RED", value:"RED", priceModifier:200},
                {id:'2', fulfillmentType:"physical", sku:"BP-POR-109-GREEN", value:"GREEN", priceModifier:300},
                {id:'3', fulfillmentType:"physical", sku:"BP-POR-109-BLUE", value:"BLUE", priceModifier:400},
            ]
        },
        {
            label:"PAPER",
            options:[
                {id:'1', fulfillmentType:"physical", sku:"BP-POR-109-PAPER-1", value:"PAPER-1", priceModifier:200},
                {id:'2', fulfillmentType:"physical", sku:"BP-POR-109-PAPER-2", value:"PAPER-2", priceModifier:300},
                {id:'3', fulfillmentType:"physical", sku:"BP-POR-109-PAPER-3", value:"PAPER-3", priceModifier:400},
            ]
        }
    ],
    isUsingStandardVariants: false,
    stats: {
        averageRating: 5.0,
        reviewCount: 3,
        stockQuantity: 10,
    },
    audit: {
        createdAt: "2026-02-05T12:30:00Z",
        createdBy: "artist_99",
        updatedAt: "2026-03-25T09:15:00Z",
        updatedBy: "artist_99",
    }
};