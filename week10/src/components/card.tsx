import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Props 타입 정의
interface CardProps {
    title: string;
    releaseDate: string;
    posterPath: string;
    movieId: number;
}

// 스타일 컴포넌트
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

// Card 컴포넌트
const Card: React.FC<CardProps> = ({ title, releaseDate, posterPath, movieId }) => {
    return (
        <Link to={`/movies/${movieId}`} style={{ textDecoration: "none" }}>
            <MovieCard>
                <MovieImage 
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`} 
                    alt={title} 
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/140x225?text=No+Image")} 
                />
                <MovieTitle>{title}</MovieTitle>
                <ReleaseDate>{releaseDate}</ReleaseDate>
            </MovieCard>
        </Link>
    );
};

export default Card;
