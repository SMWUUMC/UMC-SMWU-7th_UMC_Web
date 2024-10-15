import MovieList from "../components/movieList";

const UpComing = () => {
    return (
        <>
            <h1>개봉예정</h1>
            <MovieList to='upcoming'></MovieList>
        </>
    );
}

export default UpComing