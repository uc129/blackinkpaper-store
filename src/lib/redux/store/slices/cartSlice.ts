
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: number;
    name: string;
    currencyCode: string
    price: number;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find(i => i.id === action.payload.id);

            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },

        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },

        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
        },

        clearCart(state) {
            state.items = [];
        }
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;