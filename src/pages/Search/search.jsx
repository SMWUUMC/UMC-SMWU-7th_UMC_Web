import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchMovieList from "../../components/Movie/search-movie-list";
import * as S from "./search.style.js";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams({ mq: "" });

  const mq = searchParams.get("mq");

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    navigate(`/search?mq=${searchValue}`);
  };

  const handleSearchMovieWithKeyBoard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <S.SearchContainer>
        <input
          placeholder="영화 제목을 입력해주세요..."
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyBoard}
        />
        <button onClick={handleSearchMovie}>검색</button>
      </S.SearchContainer>
      {/* <S.MovieGridContainer> */}
      <SearchMovieList />
      {/* </S.MovieGridContainer> */}
    </div>
  );
};

export default Search;
