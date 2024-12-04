import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './search_style';
import SearchMovieList from '../components/Movie/search-movie-list';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState(''); // 검색어 상태
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
    const [searchQuery, setSearchQuery] = useState(''); // 검색 결과를 위한 쿼리 상태
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
        setSearchQuery(trimmedValue); // 쿼리 업데이트
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

            {/* 검색 결과를 렌더링 */}
            {searchQuery && <SearchMovieList query={searchQuery} />}
        </>
    );
};

export default SearchPage;
