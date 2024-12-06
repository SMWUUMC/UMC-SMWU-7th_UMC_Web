import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  width: 100%;
`;

const CategoryLink = styled(Link)`
  color: white;
  position: relative;
  cursor: default;
`;

const CategoryImg = styled.img`
  width: 300px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;

const CategoryTitle = styled.p`
  position: absolute;
  bottom: 10%;
  left: 5%;
  background-color: #484848;
  opacity: 0.8;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const MovieCategory = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ paddingLeft: "20px" }}>카테고리</h2>
      <CategoryContainer>
        <CategoryLink to={"now-playing"}>
          <CategoryImg src="data:image/jpeg;base64,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" />
          <CategoryTitle>현재 상영중인</CategoryTitle>
        </CategoryLink>
        <CategoryLink to={"popular"}>
          <CategoryImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSleSEZr0XK5HLKStNhkmfO5nEz3pJ6N7sR-g&s" />
          <CategoryTitle>인기있는</CategoryTitle>
        </CategoryLink>
        <CategoryLink to={"top-rated"}>
          <CategoryImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-DbMBUecz-03AsJl9mYuCdZV5YWLj7rGiw&s" />
          <CategoryTitle>높은 평가를 받은</CategoryTitle>
        </CategoryLink>
        <CategoryLink to={"up-coming"}>
          <CategoryImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrIIIsuTf-956PbT_sdoo1LZ_lXIvAH0rzlQ&s" />
          <CategoryTitle>개봉 예정중인</CategoryTitle>
        </CategoryLink>
      </CategoryContainer>
    </div>
  );
};

export default MovieCategory;
