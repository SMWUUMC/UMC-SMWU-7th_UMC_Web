import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import Card from '../components/card.jsx'; // Card 컴포넌트 import
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import

const Movieupcoming = () => {
    const [movies, setMovies] = useState([]);
    const api_key = 'b88af6c41bcd85f0efae124210599375';
    const base_url = 'https://api.themoviedb.org/3/movie/upcoming';
    const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동

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
            console.error("Error fetching upcoming movies: ", error);
        });
    }, []);

    // 영화 클릭 시 상세 페이지로 이동하는 함수
    const gotoMovieContents = (movieId) => {
        navigate(`/movies/${movieId}`); // 해당 영화의 ID를 이용해 상세 페이지로 이동
    };

    return (
        <div>
            <h2>개봉 예정중인</h2>
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

export default Movieupcoming;

const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px 150px;
`;
