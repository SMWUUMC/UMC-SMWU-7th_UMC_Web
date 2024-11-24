import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useMovies from '../../hooks/useMovies';
import Card from '../components/card.jsx';
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import * as S from "./home.jsx";

const MovieList = ({ category }) => {
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isError,
    } = useMovies(category);

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    if (isLoading) {
        return (
        <S.MovieGridContainer>
            <CardListSkeleton number={20} />
        </S.MovieGridContainer>
        );
    }

    if (isError) {
        return <div>영화 데이터를 불러오는 데 문제가 발생했습니다.</div>;
    }

    return (
        <div>
        <h2>{category} 영화</h2>
        <MovieContainer>
            {data.pages.map((page) =>
            page.results.map((movie) => (
                <div key={movie.id} onClick={() => handleMovieClick(movie.id)} style={{ cursor: 'pointer' }}>
                <Card
                    movieId={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                </div>
            ))
            )}
        </MovieContainer>

        {/* 페이지네이션 버튼 */}
        <PaginationContainer>
            <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            >
            {isFetchingNextPage ? "로딩 중..." : hasNextPage ? "다음 페이지" : "마지막 페이지"}
            </Button>
        </PaginationContainer>
        </div>
    );
};

export default MovieList;

const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 0 150px;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:disabled {
        background-color: #c0c0c0;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background-color: #0056b3;
    }
`;
