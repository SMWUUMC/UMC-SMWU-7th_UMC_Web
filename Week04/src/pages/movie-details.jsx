// src/pages/movie-detail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);

        // 영화 상세 정보 요청
        const movieResponse = await axiosInstance.get(`/movie/${movieId}`);
        setMovie(movieResponse.data);

        // 출연진 정보 요청
        const creditsResponse = await axiosInstance.get(`/movie/${movieId}/credits`);
        setCredits(creditsResponse.data);

      } catch (error) {
        console.error("영화 상세 정보를 가져오는 데 실패했습니다:", error);
        setError("영화 상세 정보를 가져오는 데 실패했습니다.");

      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <h2>감독/출연</h2>
      <div>
        {credits && credits.crew
          .filter(member => member.job === "Director")
          .map(director => (
            <p key={director.id}>감독 {director.name}</p>
          ))}
        <h3>출연</h3>
        {credits && credits.cast.slice(0, 5).map(actor => (
          <p key={actor.id}>{actor.name} - {actor.character}</p>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;