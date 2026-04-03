import { ProductCategoryType, ProductSubCategoryType} from "@/lib/api/ecommerce/types/product-categories";
import {product1,product2, product3, product4, product5,} from "./mock-products-list";
import { ProductTag } from "../types/product-tags";



export const mockProductCategories: ProductCategoryType[] = [
  {
    id: 1,
    name_code: "black_and_white",
    name: "BlackAndWhite",
    print_name: "Black & White",
    description:
      "Original black and white prints, handmade and signed by the artist.",
    isActive: true,
    isFeatured: true,
    slug: "black-and-white",
    coverImageUrl: "https://picsum.photos/1200/1800?random=1",
  },
  {
    id: 2,
    name_code: "city_scapes",
    name: "Cityscape",
    print_name: "City Scapes",
    description:
      "Vibrant color prints that explore the interplay of light and shadow.",
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
  },
  {
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
];

export const mockProductSubCategories: ProductSubCategoryType[] = [
  {
    id: 1,
    categoryId: 1,
    name_code: "jazz_portraits",
    name: "Jazz Portraits",
    print_name: "Jazz Portraits",
    description:
      "Black and white prints that capture the essence of jazz musicians.",
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
    description:
      "Black and white prints that explore the raw energy of urban life.",
    isActive: true,
    isFeatured: false,
    slug: "street-photography",
    coverImageUrl: "https://picsum.photos/1200/1800?random=1",
  },
];

export const mockProductTags: ProductTag[] = [
  { id: 1, name: "Monochrome", slug: "monochrome", color: "#000000" },
  { id: 2, name: "Wildlife", slug: "wildlife", color: "#4a3b22" },
  { id: 3, name: "Urban", slug: "urban", color: "#607d8b" },
  { id: 4, name: "Architecture", slug: "architecture" },
  { id: 5, name: "Anatomy", slug: "anatomy", color: "#1a237e" },
  { id: 6, name: "Sketchbook", slug: "sketchbook" },
  { id: 7, name: "Steampunk", slug: "steampunk", color: "#8d6e63" },
  { id: 8, name: "Anatomical", slug: "anatomical" },
  { id: 9, name: "Realism", slug: "realism", color: "#212121" },
  { id: 10, name: "Portrait", slug: "portrait" },
];

export const mockProducts = [product1, product2, product3, product4, product5];

