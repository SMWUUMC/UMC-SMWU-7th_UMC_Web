import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #111;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const Logo = styled(Link)`
  font-size: 24px;
  color: #ff357e;
  text-decoration: none;
  font-weight: bold;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 40px;
`;

const NavButton = styled(Link)`
  font-size: 16px;
  color: white;
  text-decoration: none;
  background-color: #ff357e;
  padding: 8px 16px;
  border-radius: 5px;

  &:hover {
    background-color: #ff1a60;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">YONGCHA</Logo>
      <NavButtons>
        <NavButton to="/login">로그인</NavButton>
        <NavButton to="/signup">회원가입</NavButton>
      </NavButtons>
    </NavbarContainer>
  );
};

export default Navbar;
