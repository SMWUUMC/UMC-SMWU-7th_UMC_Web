import React from "react";
import * as S from "./movie-card.style.js";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <>
      <S.MoviePosterCard onClick={handleCardClick}>
        <S.PosterImg
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onError={(e) =>
            (e.target.src =
              "https://archives.hangeul.go.kr/resource/template/images/img_none_01.png")
          }
        />
        <S.TextWrapper>
          <S.TitleBox>{movie.title}</S.TitleBox>
          <S.DescriptionBox>{movie.release_date}</S.DescriptionBox>
        </S.TextWrapper>
      </S.MoviePosterCard>
    </>
  );
};

export default MovieCard;
