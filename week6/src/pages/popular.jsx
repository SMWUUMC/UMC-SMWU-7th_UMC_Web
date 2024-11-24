import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import Card from '../components/card.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Moviepopular = () => {
    const [movies, setMovies] = useState([]);
    const api_key = 'b88af6c41bcd85f0efae124210599375';
    const base_url = 'https://api.themoviedb.org/3/movie/popular';
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(base_url, {
            params: {
                api_key: api_key,
                language: 'ko-KR',
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

    const gotoMovieContents = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <div>
            <h2>인기 있는 영화</h2>
            <MovieContainer>
                {movies.map(movie => (
                    <div key={movie.id} onClick={() => gotoMovieContents(movie.id)} style={{ cursor: 'pointer' }}>
                        <Card
                            movieId={movie.id}
                            title={movie.title}
                            releaseDate={movie.release_date}
                            posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                    </div>
                ))}
            </MovieContainer>
        </div>
    );
};

export default Moviepopular;


const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px 150px;
    text-decoration: none;
`;
