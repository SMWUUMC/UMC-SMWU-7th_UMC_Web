import styled from "styled-components";
import { Link } from "react-router-dom";
import Popular from './popular';

const Card = styled.div`
  height: 90px;
  width: 190px;
  background-color: ${props =>props.bgcolor|| 'black'};
  border-radius: 10px;
  text-align: left;
  padding:10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const MoviesPage = () => {
  return (
    <>
      <div>
      <h1>카테고리</h1>
        <div style={{display: 'flex', flex: 'column', gap:'10px'}}>
          <StyledLink to={'./now-playing'}>
            <Card bgcolor="#FF7471">현재 상영중인</Card>
          </StyledLink>
          <StyledLink to={'./popular'}>
            <Card bgcolor="#F2EC2F">인기있는</Card>
          </StyledLink>
          <StyledLink to={'./top-rated'}>
            <Card bgcolor="#24CCB5">높은 평가를 받은</Card>
          </StyledLink>
          <StyledLink to={'./up-coming'}>
            <Card bgcolor="#4F82EB">개봉 예정 중인</Card> 
          </StyledLink>
        </div>
      </div>
    </>
  );
};

export default MoviesPage;