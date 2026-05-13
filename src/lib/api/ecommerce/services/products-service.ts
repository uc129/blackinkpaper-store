import { apiClient } from "../../client";
import { ProductType } from "../types/product-type"


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
