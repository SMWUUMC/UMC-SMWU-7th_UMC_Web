import Card from "../../components/card.jsx";
import * as S from './movies.style.js'
import {useEffect, useState} from "react";
import axios from "axios";
import { axiosInstance } from "./apis/axios-instance.js";
import useCustomFetch from "../hooks/useCustomFetch.js"

const MoviesPage = () => {
    const { data: popularMovies, isLoading: isPopularLoading, isError: isPopularError } = useCustomFetch('/movies/popular');
    const { data: upcomingMovies, isLoading: isUpcomingLoading, isError: isUpcomingError } = useCustomFetch('/movies/upcoming');
    const { data: topRatedMovies, isLoading: isTopRatedLoading, isError: isTopRatedError } = useCustomFetch('/movies/top_rated');
    const { data: nowPlayingMovies, isLoading: isNowPlayingLoading, isError: isNowPlayingError } = useCustomFetch('/movies/now_playing');

    if (isPopularLoading || isUpcomingLoading || isTopRatedLoading || isNowPlayingLoading) {
        return <div><h1 style={{color: 'white'}}>로딩 중 입니다...</h1></div>;
    }

    if (isPopularError || isUpcomingError || isTopRatedError || isNowPlayingError) {
        return <div><h1 style={{color: 'white'}}>에러 중</h1></div>;
    }

    return (
        <S.CardList>
            {popularMovies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
            {upcomingMovies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
            {topRatedMovies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
            {nowPlayingMovies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
        </S.CardList>
    );
};

export default MoviesPage;