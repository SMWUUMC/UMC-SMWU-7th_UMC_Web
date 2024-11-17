import React from "react";
import "./MovieCard.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <MoviePosterCard onClick={handleCardClick}>
      <PosterImg
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <Overlay>
        <h3>{movie.title}</h3>
        <h6>{movie.release_date}</h6>
      </Overlay>
    </MoviePosterCard>
  );
};

export default MovieCard;

const MoviePosterCard = styled.div`
  position: relative;
  width: 200px;
  margin: 15px;

  &:hover > div {
    opacity: 1;
  }
`;

const PosterImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  color: white;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  transition: opacity 0.3s ease;
`;
