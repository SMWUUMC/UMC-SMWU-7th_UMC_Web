import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MovieCard = styled.div`
    width: 140px;
    border-radius: 8px;
    overflow: hidden;
    margin: 18px;
    &:hover {
        cursor: pointer;
    }
`;

const MovieImage = styled.img`
    width: 100%;
    height: 225px;
    object-fit: cover;
    background-color: #333;
`;

const MovieTitle = styled.div`
    font-size: 14px;
    padding: 5px 0px;
    color: white;
`;

const ReleaseDate = styled.div`
    font-size: 12px;
    color: lightgrey;
`;

const Card = ({ title, releaseDate, posterPath, movieId }) => {
    return (
        <Link to={`/movies/${movieId}`} style={{textDecoration: 'none'}}>
            <MovieCard>
                {/* 원래 imageUrl을 props로 전달 */}
                <MovieImage src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
                <MovieTitle>{title}</MovieTitle>
                <ReleaseDate>{releaseDate}</ReleaseDate>
            </MovieCard>
        </Link>
    );
};

export default Card;
