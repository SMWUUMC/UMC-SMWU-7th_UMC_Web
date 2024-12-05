import React, { useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

import MovieCard from "../components/Card/MovieCard";
import CardListSkeleton from "../components/Card/Skeleton/card-list-skeleton";
import * as S from "./Search/search.style";
import { LoadingSpinner } from "./loading-spinner.style";

const fetchMovies = async ({ pageParam = 1 }) => {
  const response = await axiosInstance.get("/movie/upcoming", {
    params: {
      language: "ko-KR",
      page: pageParam,
    },
  });
  return response.data;
};

const UpComing = () => {
  const {
    data: movies,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["upcoming"],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1 // 다음 페이지 번호 반환
        : undefined; // 더 이상 로드할 페이지가 없으면 undefined 반환
    },
  });

  const observerRef = useRef(); // Intersection Observer 참조를 위한 Ref

  // 마지막 요소를 관찰하는 콜백 함수
  const lastElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return; // 데이터가 로딩 중이면 관찰하지 않음
      if (observerRef.current) observerRef.current.disconnect(); // 기존 Observer 해제

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // 사용자가 마지막 요소를 보면 다음 페이지 요청
        }
      });

      if (node) observerRef.current.observe(node); // 새로운 요소 관찰 시작
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return (
      <S.MovieGridContainer>
        <CardListSkeleton number={20} />
      </S.MovieGridContainer>
    );
  }

  if (isError) {
    // 에러 처리
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생...</h1>
      </div>
    );
  }

  return (
    <S.MovieGridContainer>
      {movies.pages.map((page) =>
        page.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
      <div ref={lastElementRef} style={{ height: "20px" }} />
      {isFetchingNextPage && (
        <>
          <LoadingSpinner />
        </>
      )}
      {!hasNextPage && <p>끝</p>}
    </S.MovieGridContainer>
  );
};

export default UpComing;
