import { Link } from "react-router-dom";
import styled from "styled-components";
import nowplaying from './nowplaying.jpg';
import popular from './popular.jpg';
import toprated from './toprated.jpg';
import upcoming from './upcoming.jpg';

const StyledBtn = styled.button`
  position: relative;
  cursor: pointer;
  width: 250px; 
  height: 150px; 
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
`;

const CategorySection = styled.section`
  display: flex;
  gap: 10px; 
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const TextOverlay = styled.p`
  position: absolute;
  bottom: 10px; 
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  margin: 0;
`;


const CategoryBtn = () => {
  return (
    <CategorySection>
      <Link to="/movies/now-playing">
        <StyledBtn>
          <Img src={nowplaying} alt="nowplaying" />
          <TextOverlay>현재 상영중인</TextOverlay>
        </StyledBtn>
      </Link>
      <Link to="/movies/popular">
        <StyledBtn>
          <Img src={popular} alt="popular" />
          <TextOverlay>인기있는</TextOverlay>
        </StyledBtn>
      </Link>
      <Link to="/movies/top-rated">
        <StyledBtn>
          <Img src={toprated} alt="toprated" />
          <TextOverlay>높은 평가를 받은</TextOverlay>
        </StyledBtn>
      </Link>
      <Link to="/movies/up-coming">
        <StyledBtn>
          <Img src={upcoming} alt="upcoming" />
          <TextOverlay>개봉 예정중인</TextOverlay>
        </StyledBtn>
      </Link>
    </CategorySection>
  );
};

export default CategoryBtn;
