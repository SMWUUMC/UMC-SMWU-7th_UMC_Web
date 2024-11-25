import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  items: cartItems,
  totalAmount: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrement: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.amount > 1) {
        item.amount -= 1;
      } else {
        // 수량이 1보다 작아지면 장바구니에서 제거
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    calculateTotals: (state) => {
      state.totalAmount = state.items.reduce((total, item) => total + item.amount, 0);
      state.totalPrice = state.items.reduce((total, item) => total + item.amount * item.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    }
  }
});

export const { increment, decrement, calculateTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;