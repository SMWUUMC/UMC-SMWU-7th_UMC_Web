import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance.js";
import styled from "styled-components";
import MovieDetailSkeleton from "./movie-detail-skeleton.jsx";

// 영화 상세 정보 API 호출 함수
const fetchMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits", // 감독/출연진 정보 추가
      language: "ko", // 한국어로 요청
    },
  });
  return response.data;
};

const MovieDetail = () => {
  window.scrollTo(0, 0);
  const { movieId } = useParams();

  // useQuery로 데이터 호출
  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieDetail", movieId], // 쿼리 키와 movieId
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId, // movieId가 존재할 때만 실행
  });

  if (isLoading) return <MovieDetailSkeleton />;
  if (isError) return <div>영화 정보를 불러오는 데 실패했습니다.</div>;
  if (!movieData) return <div>로딩 중입니다...</div>;

  const {
    title,
    vote_average,
    release_date,
    runtime,
    overview,
    poster_path,
    credits,
  } = movieData;

  const director = credits.crew.find((member) => member.job === "Director");
  const cast = credits.cast;

  return (
    <div style={{ paddingLeft: "20px" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            position: "absolute",
            left: "150px", // sidebar만큼 띄우기
            height: "300px",
            paddingLeft: "20px",
            paddingRight: "20px",
            backgroundColor: "#000",
            opacity: "0.7",
            borderBottom: "2px white solid",
            width: "400px",
          }}
        >
          <h1>{title}</h1>
          <SmallFont>평균 {vote_average}</SmallFont>
          <SmallFont>{new Date(release_date).getFullYear()}</SmallFont>
          <SmallFont>{runtime}분</SmallFont>
          <SmallFont>{overview}</SmallFont>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={`${title} poster`}
          style={{
            height: "300px",
            width: "calc(100vw - 150px)",
            objectFit: "cover",
          }}
          onError={(e) =>
            (e.target.src =
              "https://archives.hangeul.go.kr/resource/template/images/img_none_01.png")
          }
        />
      </div>

      <h2>감독</h2>
      <div style={{ marginLeft: "23px" }}>
        <img
          src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
          alt={director.name}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            border: "1px white solid",
            borderRadius: "25px",
          }}
          onError={(e) =>
            (e.target.src =
              "https://www.studiopeople.kr/common/img/default_profile.png")
          }
        />
        <SmallFont>{director ? director.name : "감독 정보 없음"}</SmallFont>
      </div>
      <h2>출연</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: "3px",
          paddingInlineStart: "0px",
        }}
      >
        {cast.map((actor) => (
          <li
            key={actor.id}
            style={{
              listStyleType: "none",
              textAlign: "center",
              padding: "3px",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                border: "1px white solid",
                borderRadius: "25px",
              }}
              onError={(e) =>
                (e.target.src =
                  "https://www.studiopeople.kr/common/img/default_profile.png")
              }
            />
            <SmallFont>{actor.name}</SmallFont>
            <SmallFont style={{ color: "gray" }}>{actor.character}</SmallFont>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SmallFont = styled.p`
  font-size: 11px;
`;

export default MovieDetail;
