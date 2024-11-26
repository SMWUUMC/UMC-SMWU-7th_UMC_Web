import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import modalReducer from '../slice/modalSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;
