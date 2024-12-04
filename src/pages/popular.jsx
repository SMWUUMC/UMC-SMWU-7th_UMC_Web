import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useCustomFetch from "../hooks/useCustomFetch";

import styled from "styled-components";
import CardListSkeleton from "../components/Card/Skeleton/card-list-skeleton";
import MovieCard from "../components/Card/MovieCard";
import * as S from "./Search/search.style";

const Popular = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/popular?language=ko-KR&page=1`);

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
      {movies.data?.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </MovieListGrid>
  );
};

export default Popular;

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
