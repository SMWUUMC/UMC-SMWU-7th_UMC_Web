import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFilm, BsSearch } from "react-icons/bs";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #363636;
  width: 150px;
  height: calc(100% - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 999;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin: 10px 15px;

  &:hover {
    color: #aaa;
  }

  svg {
    margin-right: 8px;
  }
`;

const SideBar = () => {
  return (
    <SideBarContainer>
      <StyledLink to={"/search"}>
        <BsSearch /> 찾기
      </StyledLink>
      <StyledLink to={"/movies"}>
        <BsFilm /> 영화
      </StyledLink>
    </SideBarContainer>
  );
};

export default SideBar;
