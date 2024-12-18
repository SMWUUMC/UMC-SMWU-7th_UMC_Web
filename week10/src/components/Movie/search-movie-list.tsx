import React from 'react';
import useCustomFetch from '../../hooks/useCustomFetch'; // 사용자 정의 Fetch Hook
import * as S from '../../pages/search_style';
import Card from '../card';
import CardListSkeleton from '../Skeleton/card-list-skeleton';

// props 타입 정의
interface SearchMovieListProps {
    query: string;
}

const SearchMovieList: React.FC<SearchMovieListProps> = ({ query }) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1&api_key=b88af6c41bcd85f0efae124210599375`;

    const { data: movies, isLoading, isError } = useCustomFetch(url);

    if (isError) {
        return (
            <S.NosearchContainer>
                <h1>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</h1>
            </S.NosearchContainer>
        );
    }

    if (isLoading) {
        return (
            <S.MovieGridContainer>
                <CardListSkeleton number={20} />
            </S.MovieGridContainer>
        );
    }

    // 데이터가 없는 경우 처리
    const results = movies?.results || [];
    if (results.length === 0) {
        return (
            <S.NosearchContainer>
                <h1>검색어 "{query}"에 해당하는 데이터가 없습니다.</h1>
            </S.NosearchContainer>
        );
    }

    return (
        <S.MovieGridContainer>
            {results.map((movie) => (
                <Card
                    key={movie.id}
                    movieId={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
            ))}
        </S.MovieGridContainer>
    );
};

export default SearchMovieList;
