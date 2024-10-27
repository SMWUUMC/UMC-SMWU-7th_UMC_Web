import MovieList from "../components/movieList";
import useCustomFetch from "../hooks/useCustomFetch";
import Loading from "../components/loading";

const TopRated = () => {
    const { data:movies, isLoading, isError } = useCustomFetch('/movie/top_rated?language=ko-kr');

    let content = <Loading/>

    if (isError) {
        content = <NotFoundPage/>
        return content;
    };

    if (!isLoading) {
        content = 
            <>
                <h1>높은 평가를 받은 영화</h1>
                <MovieList movies={movies}></MovieList>
            </>
    }

    return content
}

export default TopRated