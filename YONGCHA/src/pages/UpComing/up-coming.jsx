import React, { useState } from "react";
import CardListSkeleton from "../../components/Card/Skeleton/card-list-skeleton.jsx";
import MovieCard from "../../components/Card/MovieCard.jsx";
import * as S from "../Search/search.style.js";
import {
  PaginationButtonBox,
  PaginationButton,
} from "../../components/pagination-button.style.js";
import { useQuery } from "@tanstack/react-query";
import { useGetMovies } from "../../hooks/queries/useGetMovies.js";

const UpComing = () => {
  const [page, setPage] = useState(1);

  const {
    data: movies,
    isPending, // IsLoading은 재시도 중일 때도 true이므로 IsPending 사용
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["movies", "upcoming", page],
    queryFn: () => useGetMovies({ category: "upcoming", pageParam: page }),
    keepPreviousData: true,
  });

  // cacheTime: 10000, // 무분별한 데이터 호출을 막기 위해 cacheTime, staleTime 지정
  // staleTime: 10000,

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생...</h1>
      </div>
    );
  }

  const totalPages = movies?.total_pages || 0; // 데이터를 아직 가져오지 못한 경우 대비

  return (
    <>
      <S.MovieGridContainer>
        {isPending ? (
          <CardListSkeleton number={20} />
        ) : (
          movies?.results.map((movie, _) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </S.MovieGridContainer>
      <PaginationButtonBox>
        <PaginationButton
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
            window.scrollTo(0, 0);
          }}
          disabled={page === 1 || isFetching}
        >
          이전
        </PaginationButton>
        <span>
          {page} 페이지 / {totalPages} 페이지
        </span>
        <PaginationButton
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, totalPages));
            window.scrollTo(0, 0);
          }}
          disabled={page === totalPages || isFetching}
        >
          다음
        </PaginationButton>
      </PaginationButtonBox>
    </>
  );
};

export default UpComing;
