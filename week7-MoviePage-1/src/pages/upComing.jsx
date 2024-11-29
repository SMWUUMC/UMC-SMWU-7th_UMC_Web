import MovieList from "../components/movieList";

const UpComing = () => {
    return (
        <>
            <h1>개봉예정</h1>
            <MovieList url='/movie/upcoming?language=ko-kr'></MovieList>
        </>
    );

}

export default UpComing