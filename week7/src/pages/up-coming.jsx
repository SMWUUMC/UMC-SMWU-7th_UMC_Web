import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import Card from '../components/card.jsx'; // Card 컴포넌트 import
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import

const Movieupcoming = () => {
    const [movies, setMovies] = useState([]); // 영화 데이터
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const api_key = 'b88af6c41bcd85f0efae124210599375';
    const base_url = 'https://api.themoviedb.org/3/movie/upcoming';
    const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동

    // API 요청 함수
    const fetchMovies = (page) => {
        axios.get(base_url, {
            params: {
                api_key: api_key,
                language: 'ko-KR',
                page: page,
            }
        })
        .then(response => {
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages); // 총 페이지 수 업데이트
        })
        .catch(error => {
            console.error("Error fetching upcoming movies: ", error);
        });
    };

    // 컴포넌트가 마운트되거나 페이지 변경 시 호출
    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    // 영화 클릭 시 상세 페이지로 이동하는 함수
    const gotoMovieContents = (movieId) => {
        navigate(`/movies/${movieId}`); // 해당 영화의 ID를 이용해 상세 페이지로 이동
    };

    // 페이지 변경 함수
    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
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

export default Movieupcoming;

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
