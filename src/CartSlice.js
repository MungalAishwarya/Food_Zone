// CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, name: "Kulfi", quantity: 1, price: 90 },
    { id: 2, name: "Kheer", quantity: 6, price: 110 },
    { id: 3, name: "Basundi", quantity: 4, price: 130 }
];

let CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            let existingItem = state.find(
                (item) => item.name === action.payload.name
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        clearCart: () => {
            return [];
        },
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    return state.filter(i => i.id !== action.payload);
                } else {
                    item.quantity -= 1;
                }
            }
        }
    },
});

export const { addToCart, removeItem, clearCart, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;