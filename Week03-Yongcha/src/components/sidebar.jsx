import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaFilm } from 'react-icons/fa';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 150px;
  height: 100vh;
  background-color: #111;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ff357e;
`;

const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-top: 72px; /* 네비게이션 바 아래로 메뉴를 내리기 위한 여백 */
  margin-left: 27px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #ff357e;
  }
`;

const Icon = styled.span`
  margin-right: 8px;
  font-size: 18px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarMenu>
        <MenuItem to="/search">
          <Icon><FaSearch /></Icon> 찾기
        </MenuItem>
        <MenuItem to="/movies">
          <Icon><FaFilm /></Icon> 영화
        </MenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
