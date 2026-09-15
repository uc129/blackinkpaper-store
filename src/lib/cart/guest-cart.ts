import type {
  CartItemDto,
  CartResponseDto,
  ProductResponseDto,
} from "@/lib/api/storefront/types";
import type { ProductVariantSelection } from "@/lib/products/product-selection";
import {
  getSelectedStockLimit,
  getSelectedUnitPrice,
} from "@/lib/products/product-selection";

const GUEST_CART_STORAGE_KEY = "blackinkpaper.guest-cart";

type GuestCartItemInput = {
  product: ProductResponseDto;
  quantity: number;
  selections: ProductVariantSelection[];
};

function isBrowser() {
  return typeof window !== "undefined";
}

function selectedVariantKey(item: CartItemDto) {
  return item.selectedVariants
    .map(
      ({ productVariantId, productVariantOptionId }) =>
        `${productVariantId}:${productVariantOptionId}`,
    )
    .sort()
    .join("|");
}

function withCartTotals(items: CartItemDto[]): CartResponseDto {
  return {
    id: -1,
    status: "guest",
    currencyCode: items[0]?.currencyCode || "INR",
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.lineTotal, 0),
    updatedAt: new Date().toISOString(),
    items,
  };
}

function createGuestCartItem(
  input: GuestCartItemInput,
  itemId: number,
): CartItemDto {
  const { product, quantity, selections } = input;
  const isOriginal = product.artSpecs?.isOriginal === true;
  const unitPrice = isOriginal
    ? product.pricing.finalPrice
    : getSelectedUnitPrice(product.pricing.finalPrice, selections);
  const stockLimit = isOriginal ? 1 : getSelectedStockLimit(selections);

  return {
    id: itemId,
    productDbId: product.id,
    productId: product.productId,
    name: product.name,
    slug: product.slug,
    coverImageUrl:
      product.media.coverImageUrl || product.media.headerImageUrl || null,
    currencyCode: product.pricing.currencyCode || "INR",
    basePrice: product.pricing.finalPrice,
    unitPrice,
    quantity,
    lineTotal: unitPrice * quantity,
    isOriginal,
    isAvailable: product.taxonomy.isAvailable,
    availableStockQuantity: stockLimit,
    selectedVariants: selections.map(({ variant, option }) => ({
      productVariantId: variant.id,
      productVariantOptionId: option.id,
      variantLabel: variant.label,
      optionValue: option.value,
      priceModifier: option.priceModifier,
      absolutePrice: option.absolutePrice ?? variant.absolutePrice,
      sku: variant.sku,
      fulfillmentType: String(variant.fulfillmentType),
    })),
  };
}

export function addGuestCartItem(
  cart: CartResponseDto | null,
  input: GuestCartItemInput,
) {
  const nextItemId =
    Math.min(0, ...(cart?.items.map(({ id }) => id) ?? [])) - 1;
  const incoming = createGuestCartItem(input, nextItemId);
  const incomingKey = selectedVariantKey(incoming);
  let matched = false;
  const items = (cart?.items ?? []).map((item) => {
    if (
      item.productDbId !== incoming.productDbId ||
      selectedVariantKey(item) !== incomingKey
    ) {
      return item;
    }

    matched = true;
    const quantity = item.quantity + incoming.quantity;
    return { ...item, quantity, lineTotal: item.unitPrice * quantity };
  });

  if (!matched) items.push(incoming);
  return withCartTotals(items);
}

export function updateGuestCartQuantity(
  cart: CartResponseDto | null,
  cartItemId: number,
  quantity: number,
) {
  if (!cart) return null;
  return withCartTotals(
    cart.items.map((item) =>
      item.id === cartItemId
        ? { ...item, quantity, lineTotal: item.unitPrice * quantity }
        : item,
    ),
  );
}

export function removeGuestCartItem(
  cart: CartResponseDto | null,
  cartItemId: number,
) {
  if (!cart) return null;
  return withCartTotals(cart.items.filter((item) => item.id !== cartItemId));
}

export function readGuestCart() {
  if (!isBrowser()) return null;

  try {
    const stored = window.localStorage.getItem(GUEST_CART_STORAGE_KEY);
    if (!stored) return null;
    const cart = JSON.parse(stored) as CartResponseDto;
    return Array.isArray(cart.items) ? withCartTotals(cart.items) : null;
  } catch {
    window.localStorage.removeItem(GUEST_CART_STORAGE_KEY);
    return null;
  }
}

export function writeGuestCart(cart: CartResponseDto | null) {
  if (!isBrowser()) return;
  if (!cart || cart.items.length === 0) {
    window.localStorage.removeItem(GUEST_CART_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(cart));
}

export function clearGuestCart() {
  if (isBrowser()) window.localStorage.removeItem(GUEST_CART_STORAGE_KEY);
}
