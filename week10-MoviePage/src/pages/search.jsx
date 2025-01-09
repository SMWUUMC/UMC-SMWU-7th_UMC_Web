import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/axios-instance";
import MovieList from "../components/movieList.tsx";
import CardListSkelton from "../components/skeleton/cardListSkeleton";

const SearchPage = () => {
    const [keyword, setKeyword] = useState('');
    const [isError, setIsError] = useState(false);
    const [isEntered, setIsEntered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isExist, setIsExist] = useState(undefined);
    const [movies, setMovies] = useState([]);

    const inputHandler = (e) => {
        console.log(e.target.value);
        setKeyword(e.target.value);
    }

    useEffect(() => {
        // 검색어가 없을 경우
        if (keyword.trim() === '') {
            setIsEntered(false);
            console.log('검색어가 없습니다.');
        } else {
            setIsEntered(true);
            fetchSearchResult();
        }
    }, [keyword]);

    const debounce = (func, timeout = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, timeout);
        }
    }

    const fetchSearchResult = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            console.log('검색어: ' + keyword);
            const response = await axiosInstance.get(`search/movie?query=${keyword}&language=ko-KR`);
            console.log('response');
            console.log(response);
            setIsExist(response.data.results.length > 0);
            setMovies(response);
        } catch (error) {
            console.log('검색에 오류가 발생했습니다. : ' + error);
            setIsError(true);
        } finally {
            console.log(movies);
            setIsLoading(false);
        }
    }

    const getSearchResult = debounce(inputHandler, 300);
    return (
        <>
            <h1>검색 페이지</h1>
            <PageContainer>
                <SearchInputBox>
                    <SearchInput onChange={getSearchResult} type='text' placeholder='검색어를 입력하세요' />
                    <SearchButton onClick={getSearchResult}>검색</SearchButton>
                </SearchInputBox>
                {!isEntered ? <></> : (
                        isLoading ?
                            <CardListSkelton/>:
                            (
                                (!isExist) ? <Text>검색어 '{keyword}'에 대한 검색 결과가 없습니다.</Text> :
                                    <>
                                        <MovieList url={`search/movie?query=${keyword}&language=ko-KR`}></MovieList>
                                    </>
                            )
                        
                    )
                }
            </PageContainer>
        </>
    );
}

const Text = styled.h1`
    text-align: center;
    margin-bottom: 3rem;
    color: white;
`


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SearchInputBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`

const SearchInput = styled.input`
    box-sizing: border-box;
    display: inline-block;
    min-width: 100px;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid gray;
    margin: 0.4rem;
    flex-grow: 1;
`

const SearchButton = styled.button`
    box-sizing: border-box;
    width: 5rem;
    height: 3rem;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1rem;
    color: white;
    background-color: #FF0558;
`

export default SearchPage