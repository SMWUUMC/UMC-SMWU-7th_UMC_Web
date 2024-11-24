import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";

const SidebarContainer = styled.div`
  display: flex;
  width: 150px;
  background-color: black;
  height: calc(100vh - 50px);
  padding: 1rem;
  position: fixed;
  top: 65px;
  left: 0;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none; 
`;

const SideBtn = styled.div`
  padding: 6px;
  color: white;
  font-size: 14px;
`;


const Sidebar = () => {
    return (
        <SidebarContainer>
            <SideBtn>
              <StyledLink to="/search"><FaSearch /> 찾기</StyledLink>
            </SideBtn>
            <SideBtn>
              <StyledLink to="/movies"> <BiMoviePlay /> 영화</StyledLink>
            </SideBtn>
        </SidebarContainer>
    );
};

export default Sidebar;