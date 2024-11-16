import React from 'react';// eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Navbar = () => {
    return (
        <Nav>
        <NavbarContainer>
            <Logo to="/">YONGCHA</Logo>
            <NavbarButton color={'black'}>
                <NavbarLink to="/login">로그인</NavbarLink>
            </NavbarButton>
            <NavbarButton color={'#f82f63'}>
                <NavbarLink to="/signup">회원가입</NavbarLink>
            </NavbarButton>
        </NavbarContainer>
        </Nav>
    );
};

export default Navbar;

const NavbarContainer = styled.div`
    display: flex;
    width:100%;
    margin:auto;
    flex-direction:row;
`;

const NavbarButton = styled.button`
    &:hover{
            background-color: grey;
    }
    background-color: ${props => props.color || 'white'};
    border: none;
    border-radius: 7px;
    width: 85px;
    height:30px;
    cursor: pointer;
    color: white;
    margin: 10px;
    transform: translateX(1040%);
`;


const Logo = styled(Link)`
    color:#f82f63;
    font-size: 22px;
    font-weight:800;
    text-decoration:none;
    margin: auto 20px;
`;

const NavbarLink=styled(Link)`
    color: white;
    text-decoration:none;
`;

const Nav=styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #1C1C1C;
    z-index: 1000; 
`;
