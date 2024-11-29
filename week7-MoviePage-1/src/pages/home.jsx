import { useQuery } from "@tanstack/react-query";
import MovieList from "../components/movieList";
import { useCustomFetch } from "../hooks/useCustomFetch";

const HomePage = () => {
    return (
        <>
            <h1>홈 페이지</h1>
            <MovieList url='/movie/popular?language=ko-kr'></MovieList>
        </>
    );
}

export default HomePage;