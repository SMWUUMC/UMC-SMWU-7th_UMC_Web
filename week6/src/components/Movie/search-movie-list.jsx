import React from 'react';// eslint-disable-line no-unused-vars
import { useSearchParams } from 'react-router-dom';
import useCustomFetch from '../../../hooks/useCustomFetch';
import * as S from '../../pages/search_style';
import Card from '../card';
import CardListSkeleton from '../Skeleton/card-list-skeleton';

const SearchMovieList = () => {
    const [searchParams] = useSearchParams();
    const mq = searchParams.get('mq') || '';
    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;

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

    // 데이터가 undefined 또는 빈 경우 처리
    const results = movies?.data?.results || [];
    if (results.length === 0) {
        return (
            <S.NosearchContainer>
                <h1>검색어 {mq}에 해당하는 데이터가 없습니다.</h1>
            </S.NosearchContainer>
        );
    }

    return (
        <S.MovieGridContainer>
            {results.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
        </S.MovieGridContainer>
    );
};

export default SearchMovieList;
