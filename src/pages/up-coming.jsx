import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

import styled from "styled-components";
import MovieCard from "../components/Card/MovieCard";
import CardListSkeleton from "../components/Card/Skeleton/card-list-skeleton";
import * as S from "./Search/search.style";

// API 요청 함수
const fetchMovies = async () => {
  const response = await axiosInstance.get("/movie/upcoming", {
    params: {
      language: "ko-KR",
      page: 1,
    },
  });
  return response.data; // 데이터만 반환
};

const UpComing = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["upcoming"], queryFn: fetchMovies });

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
    <MovieListGrid>
      {movies?.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </MovieListGrid>
  );
};

export default UpComing;

const MovieListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* 화면에 맞게 카드 배치 */
  gap: 13px; /* 카드 간 간격 */
  width: 100%; /* 부모 컨테이너가 화면에 맞게 크기 조정 */
  padding: 16px;
`;
