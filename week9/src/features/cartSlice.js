import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
        const item = action.payload;
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.amount += 1;
        } else {
            state.items.push({ ...item, amount: 1 });
        }
        state.totalQuantity += 1;
        state.totalAmount += parseInt(item.price, 10);
        },
        removeItem: (state, action) => {
        const id = action.payload;
        const existingItem = state.items.find((i) => i.id === id);
        if (existingItem) {
            state.totalQuantity -= existingItem.amount;
            state.totalAmount -= existingItem.amount * parseInt(existingItem.price, 10);
            state.items = state.items.filter((i) => i.id !== id);
        }
        },
        clearCart: (state) => {
        state.items = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
