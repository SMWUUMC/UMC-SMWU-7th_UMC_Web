import { useContext } from "react";
import NavbarButton from "./navbarButton";
import HoverNavbarButton from "./navbarButton";
import styled from "styled-components"
import { AuthContext } from "../contexts/AuthContext";


const Navbar = () => {
    const {userInfo, handleLogout} = useContext(AuthContext);

    const userName = userInfo?.email.split('@')[0];
    return ( 
        <Nav>
            <NavbarButton to={'/'} left='35px' text='YONGCHA' textcolor='#FF0558' weight='bold'></NavbarButton>
            {userInfo? 
                <>
                    <Text right='300px'>{userName}님 반갑습니다.</Text>
                    <Text onClick={handleLogout} right='50px' textcolor='white' backgroundcolor='black'>로그아웃</Text>
                </>
                : 
                <>
                    <NavbarButton to={'/login'} right='140px'text='로그인' textcolor='white' backgroundcolor='black'></NavbarButton>
                    <NavbarButton to={'/signup'} right='50px'text='회원가입' textcolor='white' backgroundcolor='#FF0558'></NavbarButton>
                </>
            }:
            {/* <NavbarButton to={'/login'} right='140px'text='로그인' textcolor='white' backgroundcolor='black'></NavbarButton>
            <NavbarButton right='140px' text=' 로그아웃' textcolor='white' backgroundcolor='black'></NavbarButton> */}
        </Nav>
    );
}

export default Navbar

const Nav = styled.nav`
    width: 100vw;
    height: 70px;
    z-index: 5;
    position: fixed;
    top: 0px;
    background-color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`

const Text = styled.span`
    color: white;
    width: fit-content;
    position: absolute;
    right: ${props => props.right || 'auto'};
`
