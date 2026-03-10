
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedVariant = {
    label: string; // e.g., "Size"
    choice: string; // e.g., "Large"
    priceModifier?: number;
};

export type CartItem = {
    id: number;
    name: string;
    currencyCode: string;
    basePrice: number; // The price of the item without variants
    price: number;     // The final calculated price per unit
    quantity: number;
    selectedVariants?: SelectedVariant[]; // The specific choices made
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
            // Find an item with the same ID AND the exact same variant choices
            const existingIndex = state.cartItems.findIndex(item => 
                item.id === action.payload.id && 
                JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.selectedVariants)
            );

            if (existingIndex !== -1) {
                state.cartItems[existingIndex].quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },

        // We use a unique "Cart Key" or index for removal/updates 
        // because ID is no longer enough to identify a specific row
        removeItem(state, action: PayloadAction<{id: number, variants?: SelectedVariant[]}>) {
            state.cartItems = state.cartItems.filter(item => 
                !(item.id === action.payload.id && 
                  JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.variants))
            );
        },

        updateQuantity(state, action: PayloadAction<{ id: number; variants?: SelectedVariant[]; quantity: number }>) {
            const item = state.cartItems.find(item => 
                item.id === action.payload.id && 
                JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.variants)
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },

        clearCart(state) {
            state.cartItems = [];
        },

        hydrateCart(state, action: PayloadAction<CartItem[]>) {
            state.cartItems = action.payload;
        },
    }
});

export const { addItem, removeItem, updateQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;