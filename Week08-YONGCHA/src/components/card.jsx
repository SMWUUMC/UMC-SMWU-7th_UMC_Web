import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MovieCard = styled.div`
  width: 150px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #222;
  text-align: center;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
  background-color: #333; /* 포스터 로드 실패 시 배경색 */

  ${MovieCard}:hover & {
    opacity: 0.5; /* 마우스를 올렸을 때 흐려짐 */
  }
`;

const MovieTitle = styled.div`
  font-size: 14px;
  color: white;
  padding: 10px;
`;

const ReleaseDate = styled.div`
  font-size: 12px;
  color: #bbb;
  margin-bottom: 10px;
`;

const Card = ({ title, releaseDate, posterPath, movieId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate( `/movies/${movieId}`);
  };

  return (
    <MovieCard onClick={handleClick}>
      <MovieImage src={posterPath} alt={title} />
      <MovieTitle>{title}</MovieTitle>
      <ReleaseDate>{releaseDate}</ReleaseDate>
    </MovieCard>
  );
};

export default Card;