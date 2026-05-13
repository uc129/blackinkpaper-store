import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "@/lib/api/storefront/services";
import type { AddCartItemRequest, CartResponseDto } from "@/lib/api/storefront/types";

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

export const fetchCart = createAsyncThunk("cart/fetch", () => cartService.get());

export const addServerCartItem = createAsyncThunk(
  "cart/addItem",
  (payload: AddCartItemRequest) => cartService.addItem(payload),
);

export const updateServerCartItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
    cartService.updateQuantity(cartItemId, { quantity }),
);

export const removeServerCartItem = createAsyncThunk("cart/removeItem", (cartItemId: number) =>
  cartService.removeItem(cartItemId),
);

export const clearServerCart = createAsyncThunk("cart/clear", () => cartService.clear());

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
    const fulfilled = (state: CartState, action: { payload: CartResponseDto }) => {
      state.cart = action.payload;
      state.status = "ready";
      state.error = null;
    };
    const rejected = (state: CartState, action: { error: { message?: string } }) => {
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
      .addCase(clearServerCart.rejected, rejected);
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
