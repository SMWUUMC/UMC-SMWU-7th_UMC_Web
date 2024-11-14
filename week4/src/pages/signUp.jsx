import React from 'react';// eslint-disable-line no-unused-vars
import styled from 'styled-components';

const SignupPage = () => {
    return (
        <SignupContainer>
            <Title>회원가입 페이지</Title>
        </SignupContainer>
    );
};

export default SignupPage;

const SignupContainer = styled.div`
    margin: 50px 150px;
    height: 100vh;
`;

const Title = styled.h1`
    font-size:22px;
    font-weight: bold;
`;