import React from 'react';// eslint-disable-line no-unused-vars
import styled from 'styled-components';

const MovieCard = styled.div`
    width: 150px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #222;
    text-align: center;
`;

const MovieImage = styled.img`
    width: 100%;
    height: 225px;
    object-fit: cover;
    background-color: #333; /* 포스터 로드 실패 시 배경색 */
`;

const MovieTitle = styled.div`
    font-size: 14px;
    color: white;
    padding: 10px;
`;

const ReleaseDate = styled.div`
    font-size: 12px;
    color: #bbb;
    margin-bottom: 10px;
`;

const Card = ({ title, releaseDate, posterPath }) => {
    return (
        <MovieCard>
        <MovieImage src={posterPath} alt={title} />
        <MovieTitle>{title}</MovieTitle>
        <ReleaseDate>{releaseDate}</ReleaseDate>
        </MovieCard>
    );
};

export default Card;