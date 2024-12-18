import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 영화 데이터 타입
interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
}

// API 응답 타입
interface ApiResponse {
    results: Movie[];
    total_pages: number;
}

const Movienowplaying: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const api_key = 'b88af6c41bcd85f0efae124210599375';
    const base_url = 'https://api.themoviedb.org/3/movie/now_playing';
    const navigate = useNavigate();

    // API 요청 함수
    const fetchMovies = (page: number) => {
        axios
            .get<ApiResponse>(base_url, {
                params: { api_key, language: 'ko-KR', page },
            })
            .then((response) => {
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            })
            .catch((error) => {
                console.error('Error fetching now playing movies: ', error);
            });
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const gotoMovieContents = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const changePage = (page: number) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div>
            <h2>현재 상영중인 영화</h2>
            <MovieContainer>
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => gotoMovieContents(movie.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card
                            movieId={movie.id}
                            title={movie.title}
                            releaseDate={movie.release_date}
                            posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                    </div>
                ))}
            </MovieContainer>
            {/* 페이지네이션 컨트롤 */}
            <PaginationContainer>
                <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                    이전
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </PaginationContainer>
        </div>
    );
};

export default Movienowplaying;

// 스타일 컴포넌트
const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px 150px;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;

    button {
        margin: 0 10px;
        padding: 7px 13px;
        font-size: 13px;
        background-color: #f82f63;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
    }

    span {
        font-size: 16px;
        font-weight: bold;
    }
`;
