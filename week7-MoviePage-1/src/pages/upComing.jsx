import MovieList from "../components/movieList";
import { useQuery } from "@tanstack/react-query";
import NotFoundPage from "./notFound";
import { axiosInstance } from "../axios/axios-instance";
import CardListSkelton from "../components/skeleton/cardListSkeleton";

const getMovies = async () => {
    const { data } = await axiosInstance.get('/movie/upcoming?language=ko-kr');
    return data
}

const UpComing = () => {
    const { data: movies, isLoading, isError } = useQuery({
        queryKey: ['UpComing'],
        queryFn: getMovies
    })

    return (
        <>
            <h1>개봉 예정</h1>
            {isLoading ? <CardListSkelton /> : 
                (isError? <NotFoundPage/> : <MovieList movies={movies}></MovieList>)    
            }
        </>
    )

}

export default UpComing