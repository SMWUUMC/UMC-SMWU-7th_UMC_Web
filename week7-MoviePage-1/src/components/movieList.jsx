import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useCustomFetch } from '../hooks/useCustomFetch';
import CardListSkelton from './skeleton/cardListSkeleton.jsx';
import Card from '../components/card.jsx';
import * as S from '../components/style.js';

const MovieList = ({ url }) => {

    const { getMovies } = useCustomFetch();
    const { data: movies, isLoading, isError } = useQuery({
        queryKey: ['movies'],
        queryFn: () => getMovies(url)
    })

    console.log(movies);

    return (
        isLoading ? <CardListSkelton/> : (
            isError ? <div>에러 발생</div> :
                <S.CardList>
                    {movies?.results.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </S.CardList>
        )
    )
};

export default MovieList