import MovieList from "../components/movieList";

const Popular = () => {
    return (
        <>
            <h1>인기있는</h1>
            <MovieList url='/movie/popular?language=ko-kr'></MovieList>
        </>
    );
}

export default Popular