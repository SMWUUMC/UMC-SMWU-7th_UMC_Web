import styled from "styled-components";

const MoviePosterCard = styled.div`
  position: relative;
  width: 140px;
  margin: 15px;
  cursor: pointer;
`;

const PosterImg = styled.img`
  width: 140px;
  height: 210px;
  border-radius: 10px;
  overflow: hidden;

  // 커서 올렸을 때 효과 추가하면 좋을 것 같다
`;

const TextWrapper = styled.div`
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 5px;
`;

const TitleBox = styled.div`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DescriptionBox = styled.div`
  font-size: 11px;
`;

export { MoviePosterCard, PosterImg, TextWrapper, TitleBox, DescriptionBox };
