import { create } from 'zustand';
import cartItems from '../constants/cartItems';

const useCartStore = create((set) => {

  // 장바구니에 담긴 앨범 개수 및 총 가격 계산
  const calculateTotals = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.amount * item.price, 0);
    return { totalAmount, totalPrice };
  };

  const initialTotals = calculateTotals(cartItems); // 초기값 계산

  return {
    items: cartItems,
    totalAmount: initialTotals.totalAmount,
    totalPrice: initialTotals.totalPrice,

    increment: (id) =>
      set((state) => {
        const updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
        const totals = calculateTotals(updatedItems);
        return { items: updatedItems, ...totals };
      }),

    decrement: (id) =>
      set((state) => {
        const updatedItems = state.items
          .map((item) =>
            item.id === id ? { ...item, amount: Math.max(item.amount - 1, 0) } : item
          )
          .filter((item) => item.amount > 0); // 수량이 1보다 작은 아이템 제거
        const totals = calculateTotals(updatedItems);
        return { items: updatedItems, ...totals };
      }),

    clearCart: () =>
      set(() => ({
        items: [],
        totalAmount: 0,
        totalPrice: 0,
      })),
  };
});

export default useCartStore;