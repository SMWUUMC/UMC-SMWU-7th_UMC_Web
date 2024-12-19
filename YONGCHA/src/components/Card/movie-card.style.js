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
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 210px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
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

export {
  MoviePosterCard,
  PosterImg,
  Overlay,
  TextWrapper,
  TitleBox,
  DescriptionBox,
};
