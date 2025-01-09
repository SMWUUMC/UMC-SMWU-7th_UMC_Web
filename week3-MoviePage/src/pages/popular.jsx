import MovieList from "../components/movieList";

const Popular = () => {
    return (
        <>
            <h1>인기있는</h1>
            <MovieList to='popular'></MovieList>
        </>
    );
}

export default Popular