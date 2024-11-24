import * as S from "../../pages/search_style";
import Card from "../card";
import useCustomFetch from "../../../hooks/useCustomFetch";
import {useSearchParams} from "react-router-dom";
import CardListSkeleton from "../Skeleton/card-list-skeleton";

const SearchMovieList=()=>{
    const [searchParams, setSearchParams]=useSearchParams({mq:''});
    const mq=searchParams.get('mq');
    const url=`/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;

    const {data:movies, isLoading, isError}=useCustomFetch(url);
    

    if (isError){
        return(
            <S.NosearchContainer>
                <h1>에러 발생</h1>
            </S.NosearchContainer>
        )
    }
    if (isLoading){
        return (
            <S.MovieGridContainer>
                <CardListSkeleton number={20}/>
            </S.MovieGridContainer>
        )


    }
    if (mq && movies.data?.results.length === 0){
        return(
            <S.NosearchContainer>
                <h1>해당하는 검색어 {mq}에</h1>
                <h1>해당하는 데이터가 없습니다.</h1>
            </S.NosearchContainer>
        )
    }
    return (
        <S.MovieGridContainer>
            {movies.data?.results.map((movie)=>(
                    <Card key={movie.id} movie={movie}/>
            ))}
        </S.MovieGridContainer>
    );
};

export default SearchMovieList;