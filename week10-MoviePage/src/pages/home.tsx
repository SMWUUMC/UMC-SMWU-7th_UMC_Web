import React from "react";
import MovieList from "../components/movieList";

const HomePage:React.FC = () => {
    return (
        <>
            <h1>홈 페이지</h1>
            <MovieList url='/movie/popular?language=ko-kr'></MovieList>
        </>
    );
}

export default HomePage;