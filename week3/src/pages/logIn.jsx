import React from 'react';// eslint-disable-line no-unused-vars
import styled from 'styled-components';

const LoginPage = () => {
    return (
        <LoginContainer>
            <Title>로그인 페이지</Title>
        </LoginContainer>
    );
};

export default LoginPage;

const LoginContainer = styled.div`
    margin: 50px 150px;
    height: 100vh;
`;

const Title = styled.h1`
    font-size:22px;
    font-weight: bold;
`;
