import { useEffect, useState } from 'react'
// import { MOVIES } from '../../mocks/movies.js'
import axios from 'axios';
import Card from '../components/card.jsx';
import * as S from '../components/style.js';

const MovieList = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/${props.to}?language=ko-KR&page=1`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2E3N2Y0N2MyMGEyNzliNjUwMDk5NDUwNjc0ZTE5NyIsIm5iZiI6MTcyODYyNjg2Ni43MDA3ODUsInN1YiI6IjY3MDRjZDdkNGIwYzViOWQ3MTY5YzRiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dSJqlKGb6Dd5BDcVd0VwLOmoqGAo5V1rdJl2yFa75w8`
                }
            })
            setMovies(movies);
        }
        getMovies();
    }, []);
    return (
        <S.CardList>
            {movies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie}/>
            ))}
        </S.CardList>
    )
};

export default MovieList