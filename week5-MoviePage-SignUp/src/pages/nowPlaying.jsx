import MovieList from "../components/movieList";
import useCustomFetch from "../hooks/useCustomFetch";
import Loading from "../components/loading";

const NowPlaying = () => {
    const { data:movies, isLoading, isError } = useCustomFetch('/movie/now_playing?language=ko-kr');

    let content = <Loading/>

    if (isError) {
        content = <NotFoundPage/>
        return content;
    };

    if (!isLoading) {
        content = 
            <>
                <h1>상영중</h1>
                <MovieList movies={movies}></MovieList>
            </>
    }

    return content

}

export default NowPlaying