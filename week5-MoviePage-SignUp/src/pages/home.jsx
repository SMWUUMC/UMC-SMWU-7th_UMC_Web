import MovieList from "../components/movieList";
import useCustomFetch from "../hooks/useCustomFetch";

const HomePage = () => {
    const { data:movies, isLoading, isError } = useCustomFetch('/movie/popular?language=ko-kr');
    return (
        <>
            <h1>홈 페이지</h1>
            <MovieList movies={movies}></MovieList>
        </>
    );
}

export default HomePage;