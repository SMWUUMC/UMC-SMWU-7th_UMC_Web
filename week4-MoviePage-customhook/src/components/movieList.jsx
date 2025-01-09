import { useEffect, useState } from 'react'
import Card from '../components/card.jsx';
import * as S from '../components/style.js';

const MovieList = ({movies}) => {
    
    console.log(movies);

    return (
        <S.CardList>
            {movies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie}/>
            ))}
        </S.CardList>
    )
};

export default MovieList