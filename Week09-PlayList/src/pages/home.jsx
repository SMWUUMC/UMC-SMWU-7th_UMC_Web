import React from 'react';
import styled from 'styled-components';
import { CartIcon } from '../constants/icons';
import { CartList } from '../components/CartList';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../slice/cartSlice';

const HomeContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #5d5bf0;
  color: white;
  width: 100%;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 30px;
`;

const CartIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 30px;
`;

const CartItemCount = styled.div`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 0.7rem;
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  margin-top: 30px;
  text-align: center;
  width: 65%;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
`;

const EmptyCartMessage = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #ccc;
  margin: 13px 0;
`;

const Footer = styled.footer`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  margin-top: -9px;
  font-size: 18px;
  font-weight: bold;
`;

const TotalText = styled.div`
  text-align: left;
  margin-left: 8px;
`;

const TotalPrice = styled.div`
  text-align: right;
`;

const ClearCartButton = styled.button`
  background-color: #5d5bf0;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: center;
  
  &:hover {
    background-color: #7a77f2;
  }
`;

const Home = () => {
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((total, item) => total + item.amount, 0);
  const totalPrice = items.reduce((total, item) => total + item.amount * item.price, 0);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    if (window.confirm('담아두신 모든 음반을 삭제하시겠습니까?')) {
      dispatch(clearCart());
    }
  };

  return (
    <HomeContainer>
      <Header>
        <Title>UMC PlayList</Title>
        <CartIconContainer>
          <CartIcon />
          <CartItemCount>{totalItems || 0}</CartItemCount>
        </CartIconContainer>
      </Header>
      <Main>
        <Subtitle>당신이 선택한 음반</Subtitle>
        {items.length === 0 ? (
          <EmptyCartMessage>고객님이 좋아하는 음반을 담아보세요~!</EmptyCartMessage>
        ) : (
          <>
            <CartList />
            <Divider />
            <Footer>
              <TotalContainer>
                <TotalText>총 가격</TotalText>
                <TotalPrice>₩ {totalPrice || 0}</TotalPrice>
              </TotalContainer>
              <ClearCartButton onClick={handleClearCart}>장바구니 초기화</ClearCartButton>
            </Footer>
          </>
        )}
      </Main>
    </HomeContainer>
  );
};

export default Home;