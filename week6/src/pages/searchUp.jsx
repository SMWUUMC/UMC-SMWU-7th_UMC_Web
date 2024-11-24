import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { useSearchParams } from 'react-router-dom';
import * as S from './search_style.js'
import { useNavigate } from 'react-router-dom';
import Card from '../components/card.jsx';

const SearchPage =() => {
    const [searchValue, setSearchValue] = useState('');
    const navigate=useNavigate();
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    const handleSearchMovie = () => {
        if (mq===searchValue) return;
        navigate(`/search?mq=${searchValue}`)
    }

    const handleSearchMovieWithKeyboard=(e)=>{
        if (e.key ==='Enter'){
            handleSearchMovie();
        }
    }

    return (
        <>
            <S.SearchContainer>
                <input placeholder="영화 제목을 입력해주세요..." value={searchValue} onChange={onChangeSearchValue}
                    onKeyDown={handleSearchMovieWithKeyboard}/>

                <button onClick={handleSearchMovie}>검색</button>
            </S.SearchContainer>
            <S.SearchMovieList searchValue={searchValue}/>

        </>

    );
};

export default SearchPage;

