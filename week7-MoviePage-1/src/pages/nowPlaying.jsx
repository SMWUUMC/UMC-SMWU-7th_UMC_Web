import MovieList from "../components/movieList";
import { useQuery } from "@tanstack/react-query";
import NotFoundPage from "./notFound";
import { axiosInstance } from "../axios/axios-instance";
import CardListSkelton from "../components/skeleton/cardListSkeleton";

const getMovies = async () => {
    const { data } = await axiosInstance.get('/movie/now_playing?language=ko-kr');
    return data
}

const NowPlaying = () => {
    const { data: movies, isLoading, isError } = useQuery({
        queryKey: ['NowPlaying'],
        queryFn: getMovies
    })

    return (
        <>
            <h1>상영중</h1>
            {isLoading ? <CardListSkelton /> : 
                (isError? <NotFoundPage/> : <MovieList movies={movies}></MovieList>)    
            }
        </>
    )

}

export default NowPlaying