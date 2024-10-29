import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const LayoutContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  background-color: #000;
  padding: 20px;
  color: white;
`;

function RootLayout() {
  return (
    <>
      <Navbar />
      <LayoutContainer>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </LayoutContainer>
    </>
  );
}

export default RootLayout;
