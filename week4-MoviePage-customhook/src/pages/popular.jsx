import MovieList from "../components/movieList";
import useCustomFetch from "../hooks/useCustomFetch";
import Loading from "../components/loading";

const Popular = () => {
    const { data:movies, isLoading, isError } = useCustomFetch('/movie/popular?language=ko-kr');

    let content = <Loading/>

    if (isError) {
        content = <NotFoundPage/>
        return content;
    };

    if (!isLoading) {
        content = 
            <>
                <h1>인기있는</h1>
                <MovieList movies={movies}></MovieList>
            </>
    }

    return content;
}

export default Popular