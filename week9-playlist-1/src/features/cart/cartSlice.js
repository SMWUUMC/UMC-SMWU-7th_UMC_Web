import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../mocks/cartItems';

const initialState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // TODO: 증가
        increase: (state, { payload }) => {
            // 클릭한 음반의 ID를 받아옴
            const itemId = payload;
            // id를 통해 해당 음반을 찾음
            const item = state.cartItems.find((item) => item.id === itemId);
            // 찾아낸 음반의 수량을 증가
            item.amount += 1;
        },

        // TODO: 감소
        decrease: (state, { payload }) => {
            // 클릭한 음반의 ID를 받아옴
            const itemId = payload;
            // id를 통해 해당 음반을 찾음
            const item = state.cartItems.find((item) => item.id === itemId);
            // 찾아낸 음반의 수량을 감소
            item.amount -= 1;
        },

        // TODO: 아이템 제거
        removeItem: (state, { payload }) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },

        // TODO: 모든 아이템 제거 (clear)
        clearCart: (state) => {
            state.cartItems = [];
        },

        // TODO: 총액 계산 (각각의 아이템 * 수량을 모두 더함)
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.price * item.amount;
            });

            state.amount = amount;
            state.total = total;
        }
    }
})

export const { increase, decrease, removeItem, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;