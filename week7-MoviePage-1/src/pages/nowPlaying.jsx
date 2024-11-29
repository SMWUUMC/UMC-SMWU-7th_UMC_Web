import MovieList from "../components/movieList";

const NowPlaying = () => {
    return (
        <>
            <h1>홈 페이지</h1>
            <MovieList url='/movie/now_playing?language=ko-kr'></MovieList>
        </>
    );

}

export default NowPlaying