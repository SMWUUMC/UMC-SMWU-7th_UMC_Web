import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import Card from '../components/card.jsx';
import styled from 'styled-components';
import useMovies from '../../hooks/useMovies.jsx';
import CardListSkeleton from "../components/Skeleton/card-list-skeleton";
import * as S from "./home.jsx";

const Movieupcoming = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies('upcoming');

    const gotoMovieContents = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    if (isLoading) {
        return (
            <S.MoiveGridContainer>
                <CardListSkeleton number={20} />
            </S.MoiveGridContainer>
        );
    }

    if (isError) {
        return <div>영화 데이터를 불러오는 데 문제가 발생했습니다. {error.message}</div>;
    }

    return (
        <div>
            <h2>곧 개봉하는 영화</h2>
            <MovieContainer>
                {data.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.results.map(movie => (
                            <div key={movie.id} onClick={() => gotoMovieContents(movie.id)} style={{ cursor: 'pointer' }}>
                                <Card
                                    movieId={movie.id}
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                    posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </MovieContainer>
            {hasNextPage && !isFetchingNextPage && (
                <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? '로딩 중...' : '더 보기'}
                </button>
            )}
        </div>
    );
};

export default Movieupcoming;

const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px 150px;
`;
