import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../apis/axios-instance'; 
import { useQuery } from '@tanstack/react-query';
import "./detail.css";

const fetchMovieDetail = async (movieId) => {
  const {data} = await axiosInstance.get(`/movie/${movieId}?language=ko-KO`);
  return data;
};

const fetchMovieCast = async (movieId) => {
  const {data} = await axiosInstance.get(`/movie/${movieId}/credits?language=ko-KO`);
  return data.cast;
}

const MovieDetail = () => {
  const { movieId } = useParams(); 
  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
  });

  const {
    data: cast,
    isLoading: isCastLoading,
    isError: isCastError,
  } = useQuery({
    queryKey: ["movieCast", movieId],
    queryFn: () => fetchMovieCast(movieId),
  });

  if (isMovieLoading || isCastLoading) {
    return <h1 style={{ color: "white" }}>로딩 중...</h1>;
  }

  if (isMovieError || isCastError) {
    return <h1 style={{ color: "white" }}>영화 정보를 가져오지 못했습니다.</h1>;
  }

  return (
    <div className="movie-detail" style={{ color: "white" }}>
      <div className="posterBox">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <p className="title">{movie.title}</p>
        <p className="release-date">{movie.release_date}</p>
        <p className="vote-average">평점: {movie.vote_average}</p>
        <p className="overview">{movie.overview}</p>
      </div>

      <h2>감독/출연</h2>
      <div className="actor-area">
       {cast.map((actor) => (
          <div className="actor-container" key={actor.id}>
            <div className="profileBox">
            <img className="profile" 
            src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : require('../component/no-profile.jpg')} 
            alt={actor.name || 'No Profile'} />
            </div>
            <p className="actor-name">{actor.name}</p>
            <p className="actor-character">{actor.character}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;

