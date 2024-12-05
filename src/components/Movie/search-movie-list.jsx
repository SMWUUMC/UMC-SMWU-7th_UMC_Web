import useCustomFetch from "../../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardListSkeleton from "../Card/Skeleton/card-list-skeleton";
import MovieCard from "../Card/MovieCard";
import * as S from "../../pages/Search/search.style";

const SearchMovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ mq: "" });

  const mq = searchParams.get("mq");

  const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;

  const { data: movies, isLoading, isError } = useCustomFetch(url);

  if (isError) {
    return <h1 style={{ color: "white" }}>에러 발생!</h1>;
  }
  if (mq && isLoading) {
    return (
      <S.MovieGridContainer>
        <CardListSkeleton number={20} />
      </S.MovieGridContainer>
    );
  }

  if (mq && movies.data?.results.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1 style={{ color: "white" }}>입력하신 검색어 {mq}에</h1>
        <h1 style={{ color: "white" }}>해당하는 영화가 없습니다.</h1>
      </div>
    );
  }

  return (
    <S.MovieGridContainer>
      {movies.data?.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </S.MovieGridContainer>
  );
};

export default SearchMovieList;
