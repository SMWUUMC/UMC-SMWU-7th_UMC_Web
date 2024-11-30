import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import * as S from './search_style';
import SearchMovieList from '../components/Movie/search-movie-list';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
        setErrorMessage('');
    };

    const handleSearchMovie = () => {
        const trimmedValue = searchValue.trim();
        if (!trimmedValue) {
            setErrorMessage('검색어를 입력해주세요.');
            return;
        }
        navigate(`/search?mq=${trimmedValue}`);
        setSearchValue('');
    };

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') handleSearchMovie();
    };

    return (
        <>
            <S.SearchContainer>
                <input
                    placeholder="영화 제목을 입력해주세요..."
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyDown={handleSearchMovieWithKeyboard}
                />
                <button onClick={handleSearchMovie}>검색</button>
            </S.SearchContainer>
            {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}
            <SearchMovieList />
        </>
    );
};

export default SearchPage;
