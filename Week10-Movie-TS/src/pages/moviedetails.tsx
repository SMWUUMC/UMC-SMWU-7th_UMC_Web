import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios-instance';

// 영화 데이터 타입
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number | null;
  tagline: string | null;
  overview: string | null;
}

// 캐스트 데이터 타입
interface Cast {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// 스타일 정의
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

// 컴포넌트
const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) {
      navigate('/'); // movieId가 없으면 기본 페이지로 이동
    }
    window.scrollTo(0, 0);
  }, [movieId, navigate]);

  // 영화 세부 정보 가져오기
  const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useQuery<Movie>({
    queryKey: ['movie-details', movieId],
    queryFn: () => axiosInstance.get(`/movie/${movieId}?language=ko-KR`).then((res) => res.data),
    enabled: !!movieId,
  });

  // 영화 크레딧 가져오기
  const { data: credits, isLoading: isCreditsLoading, isError: isCreditsError } = useQuery<Cast[]>({
    queryKey: ['movie-credits', movieId],
    queryFn: () => axiosInstance.get(`/movie/${movieId}/credits`).then((res) => res.data.cast),
    enabled: !!movieId,
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
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <Container>
      <Header>
        <Poster
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder.png'
          }
          alt={movie?.title || '영화 포스터'}
        />
        <Info>
          <Title>{movie?.title || '제목 없음'}</Title>
          <Subtitle>평균 {movie?.vote_average?.toFixed(1) || '정보 없음'}</Subtitle>
          <Subtitle>{movie?.release_date?.slice(0, 4) || '정보 없음'}</Subtitle>
          <Subtitle>{movie?.runtime ? `${movie.runtime}분` : '정보 없음'}</Subtitle>
          <Tagline>{movie?.tagline || ' '}</Tagline>
          <Description>{movie?.overview || ' '}</Description>
        </Info>
      </Header>
      <Credits>
        <CreditsTitle>감독/출연</CreditsTitle>
        <CastList>
          {credits?.map((cast) => (
            <CastItem key={cast.cast_id}>
              <CastImage
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : '/placeholder.png'
                }
                alt={cast.name}
              />
              <CastName>{cast.name}</CastName>
              <CharacterName>{cast.character || '역할 정보 없음'}</CharacterName>
            </CastItem>
          ))}
        </CastList>
      </Credits>
    </Container>
  );
};

export default MovieDetailPage;