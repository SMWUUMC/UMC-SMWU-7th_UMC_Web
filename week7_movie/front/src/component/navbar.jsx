import {Link} from "react-router-dom";
import styled from "styled-components";
import logo from './logo.jpg';
import NavBtn from './navbutton';
import { useUser } from "../context/NicknameProvider";

const Navbar = () => {
  const {nickname} = useUser();
    return (
        <NavContainer>
            <Logo>
                <Link to="/">
                   <img src={logo} alt="logo" />
                </Link>
            </Logo>
            
            <NavBtnWrapper>
                {nickname && <Nickname>{nickname}님, 반갑습니다.</Nickname>}
                <NavBtn />
            </NavBtnWrapper>
        </NavContainer>
    );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  background-color: black;
  padding: 1rem;
  height: 35px;
`;

const NavBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Logo = styled.div`
  img {
    margin-left: 7px;
    height: 40px;
  }
`;

const Nickname = styled.div`
  margin-top: 7px;
  color: white;
  font-size: 14px;
`