import styled from "styled-components";
import StyledLink from "./styledLink";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMovie } from "react-icons/md";

const Sidebar = () => {
    return (
        <Nav>
            <StyledLink to={'/search'} padding={'0 0 20px 0'}>
                <AiOutlineSearch color="white" style={{marginRight:10}}></AiOutlineSearch>
                찾기
            </StyledLink>
            <StyledLink to={'/movies'}>
                <MdMovie color="white" style={{marginRight:10}}></MdMovie>
                영화
            </StyledLink>
        </Nav>
    );
}

export default Sidebar

const Nav = styled.nav`
    width: 15vw;
    height: 100%;
    position: fixed;
    padding-top: 100px;
    padding-left: 40px;
    background-color: black;
    display: flex;
    flex-direction: column;
    flex: grow;
`
