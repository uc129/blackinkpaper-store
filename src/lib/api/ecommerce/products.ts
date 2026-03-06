import { apiClient } from "../client";
import { ProductType } from "./types/product-type"
import { mockProducts, mockProductCategories, mockProductSubCategories } from "@/mocks/blog/mock-product-data";


export const productService = {
    getAll: () => apiClient.get<ProductType[]>("/products"),
    getById: (id: string) => apiClient.get<ProductType>(`/products/${id}`),
    create: (data: Omit<ProductType, "id">) =>
        apiClient.post<ProductType>("/products", data),
    update: (id: string, data: Partial<ProductType>) =>
        apiClient.put<ProductType>(`/products/${id}`, data),
    delete: (id: string) =>
        apiClient.delete<void>(`/products/${id}`),
};



export const mockProductService = {
    getALl: () => mockProducts,
    getById: (id: string) => mockProducts.find(product => product.product_id === id),
    getCategories: () => mockProductCategories,
    getSubCategories: () => mockProductSubCategories,
}

