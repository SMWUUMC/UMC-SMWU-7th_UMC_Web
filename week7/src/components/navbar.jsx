import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext에서 useAuth를 import
import styled from 'styled-components';

const Navbar = () => {
    const { auth, logout } = useAuth(); // auth와 logout 함수 가져오기
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        setNickname(auth.email ? auth.email.split('@')[0] : '');
    }, [auth.email]);
    

    return (
        <Nav>
            <NavbarContainer>
                <Logo to="/">YONGCHA</Logo>

                {auth.accessToken ? (
                    <>
                        <NavbarButton color={'black'}>
                            <span>{nickname}님</span> {/* 닉네임 표시 */}
                        </NavbarButton>
                        <NavbarButton color={'#f82f63'} onClick={logout}>
                            로그아웃
                        </NavbarButton>
                    </>
                ) : (
                    <>
                        <NavbarButton color={'black'}>
                            <NavbarLink to="/login">로그인</NavbarLink>
                        </NavbarButton>
                        <NavbarButton color={'#f82f63'}>
                            <NavbarLink to="/signup">회원가입</NavbarLink>
                        </NavbarButton>
                    </>
                )}
            </NavbarContainer>
        </Nav>
    );
};

export default Navbar;

// 스타일 정의
const NavbarContainer = styled.div`
    display: flex;
    width: 100%;
    margin: auto;
    flex-direction: row;
`;

const NavbarButton = styled.button`
    &:hover {
        background-color: grey;
    }
    background-color: ${(props) => props.color || 'white'};
    border: none;
    border-radius: 7px;
    width: 85px;
    height: 30px;
    cursor: pointer;
    color: white;
    margin: 10px;
    transform: translateX(1040%);
`;

const Logo = styled(Link)`
    color: #f82f63;
    font-size: 22px;
    font-weight: 800;
    text-decoration: none;
    margin: auto 20px;
`;

const NavbarLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #1c1c1c;
    z-index: 1000;
`;



