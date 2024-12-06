import React, { useCallback, useEffect, useRef } from "react";
import CardListSkeleton from "../../components/Card/Skeleton/card-list-skeleton";
import MovieCard from "../../components/Card/MovieCard";
import * as S from "../Search/search.style";
import { useInView } from "react-intersection-observer";
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies.js";
import { ClipLoader } from "react-spinners";

const TopRated = () => {
  const {
    data: movies,
    isPending, //IsLoading은 재시도 중일 때도 true이므로 IsPending 사용
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetInfiniteMovies("top_rated");

  // cacheTime: 10000, // 무분별한 데이터 호출을 막기 위해 cacheTime, staleTime 지정
  // staleTime: 10000,
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <S.MovieGridContainer>
        <CardListSkeleton number={20} />
      </S.MovieGridContainer>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생...</h1>
      </div>
    );
  }

  return (
    <>
      <S.MovieGridContainer>
        {movies.pages
          .map((page) => page.results)
          ?.flat() // flat 문법 사용해 이중 배열을 간단히 표현
          ?.map((movie, _) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

        {isFetching && <CardListSkeleton number={20} />}
      </S.MovieGridContainer>
      <div
        ref={ref}
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!isFetching && <ClipLoader color={"#fff"} />}
      </div>
    </>
  );
};

export default TopRated;
