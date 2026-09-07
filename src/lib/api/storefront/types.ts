export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export type ProductCategoryLookupDto = {
  id: number;
  nameCode?: string | null;
  name?: string | null;
  printName?: string | null;
  slug?: string | null;
  description?: string | null;
  coverImageUrl?: string | null;
  isActive: boolean;
  isFeatured: boolean;
};

export type ProductSubCategoryLookupDto = ProductCategoryLookupDto & {
  categoryId: number;
};

export type ProductPricingDto = {
  basePrice: number;
  finalPrice: number;
  currencyCode?: string | null;
};

export type ProductTaxonomyDto = {
  categoryId: number;
  subCategoryId: number;
  isFeatured: boolean;
  isAvailable: boolean;
};

export type ProductMediaDto = {
  coverImageUrl?: string | null;
  headerImageUrl?: string | null;
};

export type ProductStatsDto = {
  averageRating: number;
  reviewCount: number;
  stockQuantity?: number | null;
};

export type ProductTextContentDto = {
  nameCode?: string | null;
  printName?: string | null;
  description?: string | null;
  shortDescription?: string | null;
};

export type ProductImageDto = {
  id: number;
  altText?: string | null;
  isPrimary: boolean;
  displayOrder: number;
  publicId?: string | null;
  baseUrl?: string | null;
  aspectRatio: number;
  width: number;
  height: number;
  placeholderUrl?: string | null;
  format?: string | null;
  dpi?: number | null;
  fileSize?: number | null;
};

export type ProductVariantOptionDto = {
  id: number;
  value?: string | null;
  priceModifier?: number | null;
  absolutePrice?: number | null;
  stockQuantity?: number | null;
};

export type ProductVariantDto = {
  id: number;
  label?: string | null;
  fulfillmentType: number;
  sku?: string | null;
  weightGrams?: number | null;
  stockQuantity?: number | null;
  absolutePrice?: number | null;
  productImageId?: number | null;
  options: ProductVariantOptionDto[];
};

export type ProductTagDto = {
  id: number;
  name?: string | null;
  slug?: string | null;
  color?: string | null;
};

export type ArtSpecificationsDto = {
  physicalDimensions?: {
    width: number;
    height: number;
    unit?: string | null;
  } | null;
  weightGrams?: number | null;
  isFramed?: boolean | null;
  material?: string | null;
  fileFormat?: string | null;
  resolutionDpi?: number | null;
  pixelDimensions?: string | null;
  paperType?: string | null;
  paperWeight?: string | null;
  inkType?: string | null;
  isOriginal: boolean;
  isSigned: boolean;
  hasCertificate: boolean;
  framingStatus?: string | null;
};

export type ProductSummaryDto = {
  id: number;
  productId?: string | null;
  name?: string | null;
  slug?: string | null;
  artistId: number;
  pricing: ProductPricingDto;
  taxonomy: ProductTaxonomyDto;
  media: ProductMediaDto;
  stats: ProductStatsDto;
  isUsingStandardVariants: boolean;
  isOriginal: boolean;
};

export type ProductResponseDto = Omit<ProductSummaryDto, "isOriginal"> & {
  artSpecs?: ArtSpecificationsDto | null;
  content: ProductTextContentDto;
  audit?: {
    createdAt: string;
    createdBy?: string | null;
    updatedAt: string;
    updatedBy?: string | null;
  };
  tags: ProductTagDto[];
  images: ProductImageDto[];
  variants: ProductVariantDto[];
};

export type ProductListQuery = {
  Query?: string;
  ArtistId?: number;
  CategoryId?: number;
  SubCategoryId?: number;
  TagId?: number;
  IsAvailable?: boolean;
  IsFeatured?: boolean;
  CategorySlug?: string;
  SubCategorySlug?: string;
  Page?: number;
  PageSize?: number;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRole = "Artist" | "User";

export type RegisterRequest = LoginRequest & {
  fullName: string;
  role: RegisterRole;
};

export type RegisterResponse = string;

export type AuthResponse = {
  success: boolean;
  token?: string | null;
  message?: string | null;
  refreshToken?: string | null;
  expiresIn: number;
};

export type UserProfileDto = {
  id?: string | null;
  email?: string | null;
  fullName?: string | null;
  artistPortfolioUrl?: string | null;
  roles: string[];
  emailConfirmed: boolean;
};

export type CartSelectedVariantDto = {
  productVariantId: number;
  productVariantOptionId: number;
  variantLabel?: string | null;
  optionValue?: string | null;
  priceModifier?: number | null;
  absolutePrice?: number | null;
  sku?: string | null;
  fulfillmentType?: string | null;
};

export type CartItemDto = {
  id: number;
  productDbId: number;
  productId?: string | null;
  name?: string | null;
  slug?: string | null;
  coverImageUrl?: string | null;
  currencyCode?: string | null;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  sku?: string | null;
  fulfillmentType?: string | null;
  selectedVariants: CartSelectedVariantDto[];
  isOriginal?: boolean;
  isAvailable?: boolean;
  availableStockQuantity?: number | null;
};

export type CartResponseDto = {
  id: number;
  currencyCode?: string | null;
  status?: string | null;
  itemCount: number;
  subtotal: number;
  updatedAt: string;
  items: CartItemDto[];
};

export type AddCartItemRequest = {
  productDbId: number;
  quantity: number;
  selectedVariants: {
    productVariantId: number;
    productVariantOptionId: number;
  }[];
};

export type UpdateCartItemQuantityRequest = {
  quantity: number;
};

export type ShippingAddressDto = {
  id: number;
  fullName?: string | null;
  phoneNumber?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  countryCode?: string | null;
  landmark?: string | null;
  isDefault: boolean;
};

export type CreateShippingAddressRequest = Omit<ShippingAddressDto, "id">;
export type UpdateShippingAddressRequest = CreateShippingAddressRequest;

export type CheckoutPreviewRequest = {
  shippingAddressId: number;
  notes?: string | null;
};

export type CheckoutItemDto = {
  cartItemId: number;
  productDbId: number;
  productId?: string | null;
  name?: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  sku?: string | null;
  fulfillmentType?: string | null;
  isOriginal?: boolean;
  isAvailable?: boolean;
  availableStockQuantity?: number | null;
  selectedVariants: {
    productVariantId: number;
    productVariantOptionId: number;
    variantLabel?: string | null;
    optionValue?: string | null;
  }[];
};

export type CheckoutPreviewDto = {
  shippingAddress: ShippingAddressDto;
  currencyCode?: string | null;
  subtotal: number;
  shippingAmount: number;
  shippingMethod?: string | null;
  shippingLabel?: string | null;
  taxAmount: number;
  taxLabel?: string | null;
  taxRatePercent: number;
  totalAmount: number;
  items: CheckoutItemDto[];
};

export type PaymentSessionDto = {
  orderId: number;
  orderNumber?: string | null;
  razorpayOrderId?: string | null;
  razorpayKeyId?: string | null;
  currencyCode?: string | null;
  amountInSubunits: number;
  displayName?: string | null;
  displayDescription?: string | null;
  prefillName?: string | null;
  prefillContact?: string | null;
  preview: CheckoutPreviewDto;
};

export type VerifyRazorpayPaymentRequest = {
  orderId: number;
  razorpayPaymentId?: string | null;
  razorpayOrderId?: string | null;
  razorpaySignature?: string | null;
};

export type PlaceOrderResponseDto = {
  orderId: number;
  orderNumber?: string | null;
  status?: string | null;
  totalAmount: number;
};

export type OrderDto = {
  id: number;
  orderNumber?: string | null;
  status?: string | null;
  paymentStatus?: string | null;
  paymentProvider?: string | null;
  currencyCode?: string | null;
  subtotal: number;
  shippingAmount: number;
  shippingMethod?: string | null;
  shippingLabel?: string | null;
  taxAmount: number;
  taxLabel?: string | null;
  taxRatePercent?: number | null;
  totalAmount: number;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  paymentMethod?: string | null;
  paidAt?: string | null;
  notes?: string | null;
  createdAt: string;
  shippingAddress: ShippingAddressDto;
  items: CartItemDto[];
};
