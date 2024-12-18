import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './search_style';
import SearchMovieList from '../components/Movie/search-movie-list';

const SearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>(''); // 검색어 상태
    const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 결과를 위한 쿼리 상태
    const navigate = useNavigate();

    // 검색어 변경 핸들러
    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setErrorMessage('');
    };

    // 영화 검색 버튼 클릭 핸들러
    const handleSearchMovie = () => {
        const trimmedValue = searchValue.trim();
        if (!trimmedValue) {
            setErrorMessage('검색어를 입력해주세요.');
            return;
        }
        setSearchQuery(trimmedValue); // 쿼리 업데이트
        setSearchValue('');
    };

    // 키보드로 검색 실행 핸들러
    const handleSearchMovieWithKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
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
