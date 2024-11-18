import React from 'react';// eslint-disable-line no-unused-vars
import styled from 'styled-components';

const HomePage = () => {
    return (
        <HomePageContainer>
            <Title>홈 페이지</Title>
        </HomePageContainer>
    );
};

export default HomePage;

const HomePageContainer = styled.div`
    margin: 50px 150px;
    height: 100vh;
`;

const Title = styled.h1`
    font-size:22px;
    font-weight: bold;
`;