import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "@/lib/api/storefront/services";
import type {
  AddCartItemRequest,
  CartResponseDto,
  ProductResponseDto,
} from "@/lib/api/storefront/types";
import {
  addGuestCartItem as addGuestItem,
  clearGuestCart,
  readGuestCart,
  removeGuestCartItem as removeGuestItem,
  updateGuestCartQuantity,
  writeGuestCart,
} from "@/lib/cart/guest-cart";
import type { ProductVariantSelection } from "@/lib/products/product-selection";

type CartState = {
  cart: CartResponseDto | null;
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
};

const initialState: CartState = {
  cart: null,
  status: "idle",
  error: null,
};

type CartRootState = { cart: CartState };

export const fetchCart = createAsyncThunk("cart/fetch", () =>
  cartService.get(),
);

export const addServerCartItem = createAsyncThunk(
  "cart/addItem",
  (payload: AddCartItemRequest) => cartService.addItem(payload),
);

export const updateServerCartItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
    cartService.updateQuantity(cartItemId, { quantity }),
);

export const removeServerCartItem = createAsyncThunk(
  "cart/removeItem",
  (cartItemId: number) => cartService.removeItem(cartItemId),
);

export const clearServerCart = createAsyncThunk("cart/clear", () =>
  cartService.clear(),
);

export const hydrateGuestCart = createAsyncThunk("cart/hydrateGuest", () =>
  readGuestCart(),
);

export const addGuestCartItem = createAsyncThunk(
  "cart/addGuestItem",
  (
    payload: {
      product: ProductResponseDto;
      quantity: number;
      selections: ProductVariantSelection[];
    },
    { getState },
  ) => {
    const currentCart = (getState() as CartRootState).cart.cart;
    const cart = addGuestItem(currentCart, payload);
    writeGuestCart(cart);
    return cart;
  },
);

export const updateGuestCartItemQuantity = createAsyncThunk(
  "cart/updateGuestQuantity",
  (
    { cartItemId, quantity }: { cartItemId: number; quantity: number },
    { getState },
  ) => {
    const currentCart = (getState() as CartRootState).cart.cart;
    const cart = updateGuestCartQuantity(currentCart, cartItemId, quantity);
    writeGuestCart(cart);
    return cart;
  },
);

export const removeGuestCartItem = createAsyncThunk(
  "cart/removeGuestItem",
  (cartItemId: number, { getState }) => {
    const currentCart = (getState() as CartRootState).cart.cart;
    const cart = removeGuestItem(currentCart, cartItemId);
    writeGuestCart(cart);
    return cart;
  },
);

export const mergeGuestCartIntoServer = createAsyncThunk(
  "cart/mergeGuestCart",
  async () => {
    let guestCart = readGuestCart();
    let serverCart: CartResponseDto | null = null;

    for (const item of guestCart?.items ?? []) {
      serverCart = await cartService.addItem({
        productDbId: item.productDbId,
        quantity: item.quantity,
        selectedVariants: item.selectedVariants.map(
          ({ productVariantId, productVariantOptionId }) => ({
            productVariantId,
            productVariantOptionId,
          }),
        ),
      });
      guestCart = removeGuestItem(guestCart, item.id);
      writeGuestCart(guestCart);
    }

    clearGuestCart();
    return serverCart ?? cartService.get();
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartState(state) {
      state.cart = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: CartState) => {
      state.status = "loading";
      state.error = null;
    };
    const fulfilled = (
      state: CartState,
      action: { payload: CartResponseDto },
    ) => {
      state.cart = action.payload;
      state.status = "ready";
      state.error = null;
    };
    const rejected = (
      state: CartState,
      action: { error: { message?: string } },
    ) => {
      state.status = "error";
      state.error = action.error.message || "Cart request failed";
    };

    builder
      .addCase(fetchCart.pending, pending)
      .addCase(fetchCart.fulfilled, fulfilled)
      .addCase(fetchCart.rejected, rejected)
      .addCase(addServerCartItem.pending, pending)
      .addCase(addServerCartItem.fulfilled, fulfilled)
      .addCase(addServerCartItem.rejected, rejected)
      .addCase(updateServerCartItemQuantity.pending, pending)
      .addCase(updateServerCartItemQuantity.fulfilled, fulfilled)
      .addCase(updateServerCartItemQuantity.rejected, rejected)
      .addCase(removeServerCartItem.pending, pending)
      .addCase(removeServerCartItem.fulfilled, fulfilled)
      .addCase(removeServerCartItem.rejected, rejected)
      .addCase(clearServerCart.pending, pending)
      .addCase(clearServerCart.fulfilled, fulfilled)
      .addCase(clearServerCart.rejected, rejected)
      .addCase(hydrateGuestCart.pending, pending)
      .addCase(hydrateGuestCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "ready";
        state.error = null;
      })
      .addCase(hydrateGuestCart.rejected, rejected)
      .addCase(addGuestCartItem.pending, pending)
      .addCase(addGuestCartItem.fulfilled, fulfilled)
      .addCase(addGuestCartItem.rejected, rejected)
      .addCase(updateGuestCartItemQuantity.pending, pending)
      .addCase(updateGuestCartItemQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "ready";
        state.error = null;
      })
      .addCase(updateGuestCartItemQuantity.rejected, rejected)
      .addCase(removeGuestCartItem.pending, pending)
      .addCase(removeGuestCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "ready";
        state.error = null;
      })
      .addCase(removeGuestCartItem.rejected, rejected)
      .addCase(mergeGuestCartIntoServer.pending, pending)
      .addCase(mergeGuestCartIntoServer.fulfilled, fulfilled)
      .addCase(mergeGuestCartIntoServer.rejected, rejected);
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
