import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    background-color: #000;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
`;

const Content = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
`;

// RootLayout 컴포넌트
const RootLayout: React.FC = () => {
    return (
        <RootContainer>
            <Navbar />
            <MainContent>
                <Sidebar />
                <Content>
                    <Outlet />
                </Content>
            </MainContent>
        </RootContainer>
    );
};

export default RootLayout;
