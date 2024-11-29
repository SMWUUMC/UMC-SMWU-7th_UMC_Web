import MovieList from "../components/movieList";

const TopRated = () => {
    return (
        <>
            <h1>높은 평가를 받은</h1>
            <MovieList url='/movie/top_rated?language=ko-kr'></MovieList>
        </>
    );
}

export default TopRated