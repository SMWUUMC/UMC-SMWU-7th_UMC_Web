import Card from "../component/card.jsx";
import * as S from '../component/movie.style.js';
import useCustomFetch from "../hooks/useCustomFetch.jsx";
import {Link} from "react-router-dom";

const TopRated = () => {
    const { data, isLoading, isError } = useCustomFetch(`/movie/top_rated?language=ko-KR`);
    if (isLoading) {
        return <div>
            <h1 style={{color: 'white'}}>로딩 중...</h1>
        </div>
    }

    if (isError) {
        return <div>
            <h1 style={{color: 'white'}}>에러가 발생했습니다.</h1>
        </div>
    }

    return (
        <S.CardList>
            {data?.results?.map((movie) => ( 
                <Link to={`/movies/${movie.id}`} key={movie.id}> 
                    <Card movie={movie} />
                </Link>
            ))}
        </S.CardList>
    );
};

export default TopRated;