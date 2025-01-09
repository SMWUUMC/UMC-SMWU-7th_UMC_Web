import NavbarButton from "./navbarButton";
import HoverNavbarButton from "./navbarButton";
import styled from "styled-components"

const Navbar = () => {
    return (
        <Nav>
            <NavbarButton to={'/'} left='35px' text='YONGCHA' textcolor='#FF0558' weight='bold'></NavbarButton>
            <NavbarButton to={'/login'} right='140px'text='로그인' textcolor='white' backgroundcolor='black'></NavbarButton>
            {/* margin={'0 10px 0 70vw'} */}
            <NavbarButton to={'/signup'} right='50px'text='회원가입' textcolor='white' backgroundcolor='#FF0558'></NavbarButton>
        </Nav>
    );
}

export default Navbar

const Nav = styled.nav`
    width: 100vw;
    height: 70px;

    position: fixed;
    top: 0px;
    background-color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`
