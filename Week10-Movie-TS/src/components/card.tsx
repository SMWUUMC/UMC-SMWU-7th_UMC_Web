import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Props 타입 정의
interface CardProps {
  title: string;
  releaseDate: string;
  posterPath: string;
  movieId: number;
  onClick: () => void;
}

// 스타일 정의
const MovieCard = styled.div`
  width: 150px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #222;
  text-align: center;
  cursor: pointer; /* 클릭 가능한 요소로 표시 */
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

// 컴포넌트 정의
const Card: React.FC<CardProps> = ({ title, releaseDate, posterPath, movieId }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/movies/${movieId}`);
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