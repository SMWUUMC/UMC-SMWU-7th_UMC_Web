import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NavBtn = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
  };

  return (
    <>
      {isLoggedIn ? (
        <StyledBtn onClick={handleLogout} backgroundColor='#5C67C1'>로그아웃</StyledBtn>
      ) : (
        <>
          <Link to="/login">
            <StyledBtn>로그인</StyledBtn>
          </Link>
          <Link to="/signup">
            <StyledBtn backgroundColor="red">회원가입</StyledBtn>
          </Link>
        </>
      )}
    </>
  );
};

export default NavBtn;

const StyledBtn = styled.button`
  color: white;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor || 'black'};
  border: none;
  &:hover {
    background-color: #4b4b4b;
  }
`;
