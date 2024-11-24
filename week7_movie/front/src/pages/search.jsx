import './search.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import Card from "../component/Card/card.jsx";
import * as S from '../component/Movie/movie.style.js';
import { useSearchParams } from "react-router-dom";
import SearchMovieList from '../component/Movie/search-movie-list.jsx';


const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const onChangeSearchvalue = (event) => {
        setSearchValue(event.target.value)
    }
    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    })

    const mq = searchParams.get('mq')
     
    const handleSearchMovie = () => { 
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`)
    }

    const handleSearchMovieWithEnter = (e) => {
        if (e.key === 'Enter'){
            handleSearchMovie();
        }   
    }


    return (
        <>
            <div className="searchBox">
              <input className="searchInput" value={searchValue} 
              onChange={onChangeSearchvalue}
              onKeyDown={handleSearchMovieWithEnter}
              placeholder='영화 제목을 검색해보세요' />
              <button onClick={handleSearchMovie} className="searchBtn">검색</button>
            </div>
            <SearchMovieList searchValue = {searchValue}/>
        </>
    ); 
};
 
export default SearchPage;