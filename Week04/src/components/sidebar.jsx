import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiFilm } from 'react-icons/fi';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #2c2c2c;
  padding: 20px;
  color: white;
  height: 100vh;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: white;
  text-decoration: none;

  &:hover {
    color: #ff007f;
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarItem to="/search"><FiSearch /> 찾기</SidebarItem>
      <SidebarItem to="/category"><FiFilm /> 영화</SidebarItem>
    </SidebarContainer>
  );
}

export default Sidebar;