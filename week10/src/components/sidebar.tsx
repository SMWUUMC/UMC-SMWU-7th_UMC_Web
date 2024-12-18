import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoSearch } from 'react-icons/io5';
import { MdMovie } from 'react-icons/md';

// Sidebar 컴포넌트
const Sidebar: React.FC = () => {
    return (
        <Nav>
            <SearchButton>
                <SearchLink to="/search"><IoSearch /> 찾기</SearchLink>
            </SearchButton>
            <SearchButton>
                <SearchLink to="/movies"><MdMovie /> 영화</SearchLink>
            </SearchButton>
        </Nav>
    );
};

export default Sidebar;

// 스타일 정의
const Nav = styled.nav`
    width: 13%;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #1C1C1C;
    z-index: 100;
`;

const SearchButton = styled.button`
    transform: translateY(70px);
    margin: 10px;
    background-color: rgba(0, 0, 0, 0);
    width: 100px;
    border: none;
    z-index: 999;
`;

const SearchLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    z-index: 1000;
`;
