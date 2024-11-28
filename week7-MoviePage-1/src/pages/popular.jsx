import MovieList from "../components/movieList";
import { useQuery } from "@tanstack/react-query";
import NotFoundPage from "./notFound";
import { axiosInstance } from "../axios/axios-instance";
import CardListSkelton from "../components/skeleton/cardListSkeleton";

const getMovies = async () => {
    const { data } = await axiosInstance.get('/movie/popular?language=ko-kr');
    return data
}

const Popular = () => {
    const { data: movies, isLoading, isError } = useQuery({
        queryKey: ['Popular'],
        queryFn: getMovies
    })

    return (
        <>
            <h1>인기있는</h1>
            {isLoading ? <CardListSkelton /> : 
                (isError? <NotFoundPage/> : <MovieList movies={movies}></MovieList>)    
            }
        </>
    )

}

export default Popular