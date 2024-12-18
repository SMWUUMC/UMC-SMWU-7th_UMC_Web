import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card'; // Card 컴포넌트 import (jsx -> tsx로 변경해야 할 경우)
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
}

const Moviepopular: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]); // 영화 데이터 타입 지정
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 타입 지정
    const [totalPages, setTotalPages] = useState<number>(1); // 총 페이지 수 타입 지정
    const api_key = 'b88af6c41bcd85f0efae124210599375';
    const base_url = 'https://api.themoviedb.org/3/movie/popular';
    const navigate = useNavigate();

    // API 요청 함수
    const fetchMovies = (page: number) => {
        axios.get(base_url, {
            params: {
                api_key: api_key,
                language: 'ko-KR',
                page: page,
            }
        })
        .then(response => {
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        })
        .catch(error => {
            console.error("Error fetching popular movies: ", error);
        });
    };

    // 컴포넌트가 마운트되거나 페이지 변경 시 호출
    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    // 영화 클릭 시 상세 페이지로 이동하는 함수
    const gotoMovieContents = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    // 페이지 변경 함수
    const changePage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
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

            {/* 페이지네이션 컨트롤 */}
            <PaginationContainer>
                <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                    이전
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                    다음
                </button>
            </PaginationContainer>
        </div>
    );
};

export default Moviepopular;

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
