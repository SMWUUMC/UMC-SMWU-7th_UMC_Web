import Card from "../component/card.jsx";
import * as S from '../component/movie.style.js';
import {useEffect, useState} from "react";
import axios from "axios";

const NowPlaying = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KO&page=1`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2E3YmViZmFlZGM2YmE0OGU2ZDc3ODQ2MjRkYzc4YSIsIm5iZiI6MTczMDIxNDEwMy4yMTg2MzksInN1YiI6IjY3MjBmNjU3ZTgzM2Q5MmVmMDYwZDYwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b87Lh-n-Tq9RoCRinqM-nZY8BrD97yFwYyWMz1yaZ_I`
                }
            })
            setMovies(movies);
        }
        getMovies()
    }, []);

    return (
        <S.CardList>
            {movies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie}/>
            ))}
        </S.CardList>
    )
};

export default NowPlaying;