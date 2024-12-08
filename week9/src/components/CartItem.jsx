import React from 'react';//eslint-disable-line
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { increase, decrease } from '../features/cartSlice';
import { ChevronUp, ChevronDown } from '../constants/icons';

const CartItem = ({ id, title, singer, price, img, amount }) => {
    const dispatch = useDispatch();

    return (
        <Item>
        <img src={img} alt={title} />
        <div>
            <h4>{title}</h4>
            <p>{singer}</p>
            <p>{price}원</p>
            <div>
            <button onClick={() => dispatch(increase(id))}>
                <ChevronUp />
            </button>
            <span>{amount}</span>
            <button onClick={() => dispatch(decrease(id))}>
                <ChevronDown />
            </button>
            </div>
        </div>
        </Item>
    );
};

const Item = styled.div`
    
`;

export default CartItem;
