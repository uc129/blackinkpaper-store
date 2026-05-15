import { apiClient } from "@/lib/api/client";
import type {
  AddCartItemRequest,
  AuthResponse,
  CartResponseDto,
  CheckoutPreviewDto,
  CheckoutPreviewRequest,
  CreateShippingAddressRequest,
  LoginRequest,
  OrderDto,
  PagedResult,
  PaymentSessionDto,
  PlaceOrderResponseDto,
  ProductListQuery,
  ProductResponseDto,
  ProductSummaryDto,
  RegisterRequest,
  RegisterResponse,
  ShippingAddressDto,
  UpdateCartItemQuantityRequest,
  UpdateShippingAddressRequest,
  UserProfileDto,
  VerifyRazorpayPaymentRequest,
} from "./types";

export const storefrontProductService = {
  getProducts: (query: ProductListQuery = {}) =>
    apiClient.get<PagedResult<ProductSummaryDto>>("/api/products", { query }),
  getById: (id: number) => apiClient.get<ProductResponseDto>(`/api/products/${id}`),
  getBySlug: (slug: string) =>
    apiClient.get<ProductResponseDto>(`/api/products/slug/${encodeURIComponent(slug)}`),
};

export const authService = {
  register: (payload: RegisterRequest) =>
    apiClient.post<RegisterResponse>("/api/Accounts/register", payload),
  login: (payload: LoginRequest) => apiClient.post<AuthResponse>("/api/Accounts/login", payload),
  logout: () => apiClient.post<void>("/api/Accounts/logout", undefined, { auth: true }),
  profile: () => apiClient.get<UserProfileDto>("/api/Accounts/profile", { auth: true }),
  refresh: (refreshToken: string) =>
    apiClient.post<AuthResponse>("/api/Accounts/refresh", { refreshToken }),
};

export const cartService = {
  get: () => apiClient.get<CartResponseDto>("/api/cart", { auth: true }),
  clear: () => apiClient.delete<CartResponseDto>("/api/cart", { auth: true }),
  addItem: (payload: AddCartItemRequest) =>
    apiClient.post<CartResponseDto>("/api/cart/items", payload, { auth: true }),
  updateQuantity: (cartItemId: number, payload: UpdateCartItemQuantityRequest) =>
    apiClient.put<CartResponseDto>(`/api/cart/items/${cartItemId}`, payload, { auth: true }),
  removeItem: (cartItemId: number) =>
    apiClient.delete<CartResponseDto>(`/api/cart/items/${cartItemId}`, { auth: true }),
};

export const shippingAddressService = {
  list: () => apiClient.get<ShippingAddressDto[]>("/api/shipping-addresses", { auth: true }),
  create: (payload: CreateShippingAddressRequest) =>
    apiClient.post<ShippingAddressDto>("/api/shipping-addresses", payload, { auth: true }),
  update: (id: number, payload: UpdateShippingAddressRequest) =>
    apiClient.put<ShippingAddressDto>(`/api/shipping-addresses/${id}`, payload, { auth: true }),
  delete: (id: number) =>
    apiClient.delete<void>(`/api/shipping-addresses/${id}`, { auth: true }),
};

export const checkoutService = {
  preview: (payload: CheckoutPreviewRequest) =>
    apiClient.post<CheckoutPreviewDto>("/api/checkout/preview", payload, { auth: true }),
  createPaymentSession: (payload: CheckoutPreviewRequest) =>
    apiClient.post<PaymentSessionDto>("/api/checkout/payment-session", payload, { auth: true }),
  verifyPayment: (payload: VerifyRazorpayPaymentRequest) =>
    apiClient.post<OrderDto>("/api/checkout/verify-payment", payload, { auth: true }),
  placeOrder: (payload: CheckoutPreviewRequest) =>
    apiClient.post<PlaceOrderResponseDto>("/api/checkout/place-order", payload, { auth: true }),
  orders: (page = 1, pageSize = 20) =>
    apiClient.get<PagedResult<OrderDto>>("/api/checkout/orders", {
      auth: true,
      query: { page, pageSize },
    }),
  orderById: (orderId: number) =>
    apiClient.get<OrderDto>(`/api/checkout/orders/${orderId}`, { auth: true }),
  cancelOrder: (orderId: number) =>
    apiClient.post<void>(`/api/checkout/orders/${orderId}/cancel`, undefined, { auth: true }),
};
