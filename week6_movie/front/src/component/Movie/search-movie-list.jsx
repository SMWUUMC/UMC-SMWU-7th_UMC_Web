import Card from "../Card/card.jsx";
import * as S from './movie.style.js';
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch.jsx";
import CardListSkeleton from "../Card/Skeleton/card-list-skeleton.jsx";

const SearchMovieList = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    })
    const mq = searchParams.get('mq')

    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`
    const {data: movies,isLoading,isError} = useCustomFetch(url);

    if (isLoading) {
        return (
            <S.CardList>
                <CardListSkeleton/>
            </S.CardList>
        )
    }

    if (mq && movies?.results?.length === 0){
        return (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <h1 style={{color: 'white'}}>{mq} 와/과</h1>
                <h1 style={{color: 'white'}}>일치하는 영화가 없습니다.</h1>
            </div>
        )
    }

    return (
        <S.CardList>
        {movies?.results?.map((movie) => ( 
           <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none"}}> 
               <Card movie={movie} />
            </Link>
          ))}
      </S.CardList>
    );
};

export default SearchMovieList;