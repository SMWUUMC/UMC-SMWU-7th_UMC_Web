import React from 'react';// eslint-disable-line no-unused-vars
import styled from 'styled-components';

const SearchPage = () => {
    return (
        <SearchContainer>
            <Title>검색 페이지</Title>
        </SearchContainer>
    );
};

export default SearchPage;

const SearchContainer = styled.div`
    margin: 50px 150px;
    height: 100vh;
`;

const Title = styled.h1`
    font-size:22px;
    font-weight: bold;
`;