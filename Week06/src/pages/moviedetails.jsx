import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../api/axios-instance';

const Container = styled.div`
  padding: 20px;
  margin-left: 140px;
  margin-top: 35px;
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

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await axiosInstance.get(`/movie/${movieId}/credits`);
        setCredits(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieDetails();
    fetchCredits();
  }, [movieId]);

  if (!movie) return <p>로딩 중...</p>;

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
          {credits.map((cast) => (
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