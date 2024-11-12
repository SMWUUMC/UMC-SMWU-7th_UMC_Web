import React, { useEffect, useState } from 'react';// eslint-disable-line no-unused-vars
import axios from 'axios';
import Card from '../components/card'; // Card 컴포넌트 import
import styled from 'styled-components';

const Movietoprated = () => {
    const [movies, setMovies] = useState([]);
    const api_key = 'b88af6c41bcd85f0efae124210599375';
    const base_url = 'https://api.themoviedb.org/3/movie/top_rated';

    useEffect(() => {
        axios.get(base_url, {
            params: {
                api_key: api_key,
                language: 'ko-KR', // 한국어로 영화 데이터 받기
                page: 1
            }
        })
        .then(response => {
            setMovies(response.data.results);
        })
        .catch(error => {
            console.error("Error fetching popular movies: ", error);
        });
    }, []);

    return (
        <div>
            <h2>높은 평가를 받은 영화</h2>
            <MovieContainer>
                {movies.map(movie => (
                    <Card
                        key={movie.id}
                        title={movie.title}
                        releaseDate={movie.release_date}
                        posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                ))}
            </MovieContainer>
        </div>
    );
};

export default Movietoprated;

const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px 150px;
`;