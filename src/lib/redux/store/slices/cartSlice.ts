
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: number;
    name: string;
    currencyCode: string
    price: number;
    quantity: number;
};

type CartState = {
    cartItems: CartItem[];
};

const initialState: CartState = {
    cartItems: [], // Initialize as an empty array
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existing = state.cartItems.find(i => i.id === action.payload.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },

        removeItem(state, action: PayloadAction<number>) {
            state.cartItems = state.cartItems?.filter(i => i.id !== action.payload);
                console.log("Item Removed", action.payload)

        },

        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
            const item = state.cartItems?.find(i => i.id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
             console.log("Item Quantity Updated")
        },

        clearCart(state) {
            state.cartItems = [];
            console.log("Cart Cleared");
        },

        hydrateCart(state, action: PayloadAction<CartItem[]>) {
            state.cartItems = action.payload;
        },
    }
});

export const { addItem, removeItem, updateQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;