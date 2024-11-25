import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ChevronUp, ChevronDown } from '../constants/icons.jsx';
import { increment, decrement, calculateTotals } from '../slice/cartSlice';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 103%;
  margin: 0 auto;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const AlbumImage = styled.img`
  width: 70px;
  height: 70px;
`;

const AlbumDetails = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AlbumTitleAndSinger = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const AlbumSinger = styled.span`
  font-size: 0.9rem;
  font-weight: normal;
`;

const AlbumPrice = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-top: 7px;
  color: #666;
`;

const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuantityButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 10px;
`;

const Quantity = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 10px;
`;

const CartList = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(calculateTotals()); // 총 수량 및 금액 계산
    }, [cartItems, dispatch]);  

  return (
    <CartContainer>
      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <AlbumImage src={item.img} alt={item.title} />
          <AlbumDetails>
            <AlbumTitleAndSinger>
              {item.title} <AlbumSinger>| {item.singer}</AlbumSinger>
            </AlbumTitleAndSinger>
            <AlbumPrice>₩ {item.price}</AlbumPrice>
          </AlbumDetails>
          <QuantityContainer>
            <QuantityButton onClick={() => dispatch(increment(item.id))}>
              <ChevronUp />
            </QuantityButton>
            <Quantity>{item.amount}</Quantity>
            <QuantityButton onClick={() => dispatch(decrement(item.id))}>
              <ChevronDown />
            </QuantityButton>
          </QuantityContainer>
        </CartItem>
      ))}
    </CartContainer>
  );
};

export { CartList };