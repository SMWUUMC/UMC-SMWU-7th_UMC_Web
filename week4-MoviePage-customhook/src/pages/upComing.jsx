import MovieList from "../components/movieList";
import useCustomFetch from "../hooks/useCustomFetch";
import Loading from "../components/loading";

const UpComing = () => {
    const { data:movies, isLoading, isError } = useCustomFetch('/movie/upcoming?language=ko-kr');

    let content = <Loading/>

    if (isError) {
        content = <NotFoundPage/>
        return content;
    };

    if (!isLoading) {
        content = 
            <>
                <h1>개봉예정</h1>
                <MovieList movies={movies}></MovieList>
            </>
    }

    return content;
}

export default UpComing