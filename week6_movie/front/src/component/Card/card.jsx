import React from 'react';
import * as S from './card.style';
const Card = ({ movie }) => {
    return (
          <S.CardContainer>
             <S.Poster 
                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                 alt={movie.title} 
             />
             <S.StyledLink href="...">
                <S.MovieTitle>{movie.title}</S.MovieTitle>
            </S.StyledLink>
             <S.ReleaseDate>{movie.release_date}</S.ReleaseDate>
          </S.CardContainer>
    );
};

export default Card;
