import Card from "../component/Card/card.jsx";
import * as S from '../component/Movie/movie.style.js';
import useCustomFetch from "../hooks/useCustomFetch.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { data, isLoading, isError } = useCustomFetch(`/movie/popular?language=ko-KR`);
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
        <>
          <h2>
            🔥지금 뜨고 있는 영화🔥
          </h2>
          <S.CardList>
              {data?.results?.map((movie) => ( 
                  <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none"}}> 
                      <Card movie={movie} />
                  </Link>
              ))}
          </S.CardList>
        </>
    );
};

export default HomePage;