import MovieList from "../components/movieList";

const TopRated = () => {
    return (
        <>
            <h1>최고평점</h1>
            <MovieList to='top_rated'></MovieList>
        </>
    );
}

export default TopRated