import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = styled.button`
  color: #f82e62;
  border: none;
  cursor: pointer;
  border: none;
  background: none;
  font-family: "yg-jalnan";
  font-size: 20px;
`;

const LogInButton = styled.button`
  color: white;
  cursor: pointer;
  background: none;
  border: none;
  font-family: "Freesentation-9Black";

  &:hover {
    color: #aaa;
  }
`;

const SignUpButton = styled.button`
  color: white;
  background-color: #f82e62;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-family: "Freesentation-9Black";

  &:hover {
    color: #aaa;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Nav = styled.nav`
  background-color: #363636;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const NavBar = () => {
  return (
    <Nav>
      <StyledLink to={"/"}>
        <Logo>YONGCHA</Logo>
      </StyledLink>
      <span style={{ alignItems: "flex-start" }}>
        <StyledLink to={"/login"}>
          <LogInButton>로그인</LogInButton>
        </StyledLink>
        <StyledLink to={"/auth/register"}>
          <SignUpButton>회원가입</SignUpButton>
        </StyledLink>
      </span>
    </Nav>
  );
};

export default NavBar;
