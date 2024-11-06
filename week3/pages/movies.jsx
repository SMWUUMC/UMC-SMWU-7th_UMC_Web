import React from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
    return (
        <ImageContainer>
            <ImageBox>
                <ImageLink to="/now-playing">현재 상영중인</ImageLink>
            </ImageBox>
            <ImageBox>
                <ImageLink to="/popular">인기있는</ImageLink>
            </ImageBox>
            <ImageBox>
                <ImageLink to="/top-rated">높은 평가를 받은</ImageLink>
            </ImageBox>
            <ImageBox>
                <ImageLink to="/up-coming">개봉 예정중인</ImageLink>
            </ImageBox>
        </ImageContainer>
    );
};

export default MoviesPage;

const ImageContainer = styled.div`
    width: 70%;
    transform: translate(30px, 70px);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
`;

const ImageBox = styled.div`
    width: 200px;
    height: 100px;
    border: 2px solid white;
    background-color: green;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;

const ImageLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    font-weight: bold;

    &:hover {
        color: lightgrey;
    }
`;
