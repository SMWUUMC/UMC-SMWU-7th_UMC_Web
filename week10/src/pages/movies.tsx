import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import nowPlayingImage from './path/now-playing-image.jpg';
import popularImage from './path/popular-image.jpg';
import topRatedImage from './path/top-rated-image.jpg';
import upComingImage from './path/up-coming-image.jpg';

interface ImageBoxProps {
    imageUrl: string;
}

const MoviesPage: React.FC = () => {
    return (
        <ImageContainer>
            <LinkWrapper to="/movies/now-playing">
                <ImageBox imageUrl={nowPlayingImage}>
                    <ImageLink>현재 상영중인</ImageLink>
                </ImageBox>
            </LinkWrapper>
            <LinkWrapper to="/movies/popular">
                <ImageBox imageUrl={popularImage}>
                    <ImageLink>인기있는</ImageLink>
                </ImageBox>
            </LinkWrapper>
            <LinkWrapper to="/movies/top-rated">
                <ImageBox imageUrl={topRatedImage}>
                    <ImageLink>높은 평가를 받은</ImageLink>
                </ImageBox>
            </LinkWrapper>
            <LinkWrapper to="/movies/up-coming">
                <ImageBox imageUrl={upComingImage}>
                    <ImageLink>개봉 예정중인</ImageLink>
                </ImageBox>
            </LinkWrapper>
        </ImageContainer>
    );
};

export default MoviesPage;

const ImageContainer = styled.div`
    width: 70%;
    margin: 80px 150px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 10px;
`;

const LinkWrapper = styled(Link)`
    width: 200px;
    height: 180px;
    margin: 10px;
    text-decoration: none;
`;

const ImageBox = styled.div<ImageBoxProps>`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    background-image: url(${(props) => props.imageUrl});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const ImageLink = styled.div`
    color: white;
    text-decoration: none;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 5px;
    width: 100%;
    text-align: start;

    &:hover {
        color: lightgrey;
    }
`;
