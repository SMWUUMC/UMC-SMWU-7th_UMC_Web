import React from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const CategoryItem = styled.div`
  background-color: #ddd;
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

function CategoryPage() {
  return (
    <>
      <h1>카테고리</h1>
      <CategoryContainer>
        <CategoryItem>현재 상영중인</CategoryItem>
        <CategoryItem>인기있는</CategoryItem>
        <CategoryItem>높은 평가를 받은</CategoryItem>
        <CategoryItem>개봉 예정중인</CategoryItem>
      </CategoryContainer>
    </>
  );
}

export default CategoryPage;