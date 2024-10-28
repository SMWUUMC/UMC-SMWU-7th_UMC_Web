import { Link } from "react-router-dom";
import styled from "styled-components";

// icons
import { IoIosSearch } from "react-icons/io";
import { RiMovieLine } from "react-icons/ri";

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 200px;
  min-width: 200px;
  height: 100%;
  background-color: #111;
  padding: 20px;
  gap: 5px;
`;
const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  font-size: 18px;
  color: white;
`;

const Sidebar = () => {
  return (
    <StyledAside>
      <div style={{display:'flex', flex:'row', gap:'5px', alignItems:'center'}}>
        <IoIosSearch /><StyledLink to='/search'>찾기</StyledLink>
      </div>
      <div style={{display:'flex', flex:'row', gap:'5px',  alignItems:'center'}}>
        <RiMovieLine /><StyledLink to='/movies'>영화</StyledLink>
      </div>
    </StyledAside>
  );
};

export default Sidebar;