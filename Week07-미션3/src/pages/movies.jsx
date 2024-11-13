import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const categories = [
  { title: '현재 상영중인', color: '#FFD700', route: '/movies/now-playing'},
  { title: '인기있는', color: '#FF6347', route: '/movies/popular'},
  { title: '높은 평가를 받은', color: '#1E90FF', route: '/movies/top-rated'}, 
  { title: '개봉 예정중인', color: '#32CD32', route: '/movies/up-coming'},
];

const MoviesContainer = styled.div`
  padding: 20px;
  margin-left: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const CategoryGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const CategoryCard = styled.div`
  position: relative;
  width: 260px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color}; /* 각 카테고리 색상 설정 */
`;

const CategoryLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
`;

const MoviesPage = () => {
  const navigate = useNavigate();

  return (
    <MoviesContainer>
      <Title>카테고리</Title>
      <CategoryGrid>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            color={category.color}
            onClick={() => category.route && navigate(category.route)}
          >
            <CategoryLabel>{category.title}</CategoryLabel>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </MoviesContainer>
  );
};

export default MoviesPage;