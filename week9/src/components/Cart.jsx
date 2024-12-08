import React from "react";//eslint-disable-line
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../features/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

    return (
        <div>
        <h1>Shopping Cart</h1>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Amount: {totalAmount}</p>
        <div>
            {items.map((item) => (
            <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.singer}</p>
                <p>{item.price}</p>
                <button onClick={() => dispatch(addItem(item))}>+</button>
                <button onClick={() => dispatch(removeItem(item.id))}>-</button>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Cart;
