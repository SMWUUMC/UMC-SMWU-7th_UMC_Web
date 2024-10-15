import MovieList from "../components/movieList";

const NowPlaying = () => {
    return (
        <>
            <h1>상영중</h1>
            <MovieList to='now_playing'></MovieList>
        </>
    );
}

export default NowPlaying