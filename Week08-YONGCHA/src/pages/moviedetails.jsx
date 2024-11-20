import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios-instance';

const Container = styled.div`
  padding: 20px;
  margin-left: 150px;
  margin-top: 47px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Poster = styled.img`
  width: 250px;
  border-radius: 10px;
`;

const Info = styled.div`
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin: 7px 0;
`;

const Tagline = styled.p`
  font-size: 21px;
  font-style: italic;
  font-weight: bold;
  color: skyblue;
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Credits = styled.div`
  margin-top: 20px;
`;

const CreditsTitle = styled.h3`
  font-size: 26px;
  margin-bottom: 20px;
  margin-left: 15px;
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const CastItem = styled.div`
  display: inline-block;
  width: 100px;
  margin: 3px;
  margin-left: 10px;
  text-align: center;
`;

const CastImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid white;
`;

const CastName = styled.p`
  font-size: 14px;
  margin: 0;
  text-align: center;
  font-weight: bold;
`;

const CharacterName = styled.p`
  font-size: 12px;
  color: #aaa;
  text-align: center;
  margin: 0;
`;

const SkeletonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-left: 180px;
  margin-top: 80px;
`;

const SkeletonPoster = styled.div`
  width: 250px;
  height: 375px;
  border-radius: 10px;
  background-color: #444;
`;

const SkeletonInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SkeletonTitle = styled.div`
  width: 60%;
  height: 32px;
  border-radius: 5px;
  background-color: #444;
`;

const SkeletonText = styled.div`
  width: 80%;
  height: 18px;
  border-radius: 5px;
  background-color: #444;

  &:nth-child(2) {
    width: 50%;
  }
`;

const SkeletonCredits = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

const SkeletonCastItem = styled.div`
  width: 100px;
  height: 130px;
  background-color: #444;
  border-radius: 10px;
`;

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Movie ID from URL:", movieId);
    // movieId가 없을 경우
    if (!movieId) {
      navigate('/'); // 기본 페이지로
    }
    window.scrollTo(0, 0);
  }, [movieId, navigate]);

  // 영화 세부 정보 가져오기
  const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => axiosInstance.get(`/movie/${movieId}?language=ko-KR`).then((res) => res.data),
  });

  // 영화 크레딧 가져오기
  const { data: credits, isLoading: isCreditsLoading, isError: isCreditsError } = useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => axiosInstance.get(`/movie/${movieId}/credits`).then((res) => res.data.cast),
  });

  if (isMovieLoading || isCreditsLoading) {
    return (
      <SkeletonContainer>
        <SkeletonPoster />
        <SkeletonInfo>
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonCredits>
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCastItem key={index} />
            ))}
          </SkeletonCredits>
        </SkeletonInfo>
      </SkeletonContainer>
    );
  }

  if (isMovieError || isCreditsError) {
    return <Message>오류가 발생했습니다.</Message>;
  }

  return (
    <Container>
      <Header>
        <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <Info>
          <Title>{movie.title}</Title>
          <Subtitle>평균 {movie.vote_average.toFixed(1)}</Subtitle>
          <Subtitle>{movie.release_date.slice(0, 4)}</Subtitle>
          <Subtitle>{movie.runtime}분</Subtitle>
          <Tagline>{movie.tagline}</Tagline>
          <Description>{movie.overview}</Description>
        </Info>
      </Header>
      <Credits>
        <CreditsTitle>감독/출연</CreditsTitle>
        <CastList>
          {credits?.map((cast) => (
            <CastItem key={cast.cast_id}>
              <CastImage src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
              <CastName>{cast.name}</CastName>
              <CharacterName>{cast.character}</CharacterName>
            </CastItem>
          ))}
        </CastList>
      </Credits>
    </Container>
  );
};

export default MovieDetailPage;