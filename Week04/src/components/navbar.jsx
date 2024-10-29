import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  color: white;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #ff007f;
  text-decoration: none;
`;

const Button = styled(Link)`
  color: white;
  background-color: #ff007f;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    background-color: #e60073;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Logo to="/">YONGCHA</Logo>
      <div>
        <Button to="/login">로그인</Button>
        <Button to="/signup">회원가입</Button>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;