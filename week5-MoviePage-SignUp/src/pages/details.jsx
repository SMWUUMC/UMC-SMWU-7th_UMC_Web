import { useLocation } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Loading from '../components/loading';
import NotFoundPage from './notFound';

const Details = () => {
    const location = useLocation();
    const { movieId, title } = location.state || {}; // state를 안전하게 접근
    const { data: movie, isLoading, isError } = useCustomFetch(`/movie/${movieId}?language=ko-kr`);
    const { data: credits, isCreditLoading, isCreditError } = useCustomFetch(`movie/${movieId}/credits?language=ko-kr`);

    let content = <Loading/>

    if (isError) {
        content = <NotFoundPage/>
        return content;
    };

    if (!isLoading) {
        content =
            <>
                <Banner>
                    <BannerImg src={`https://image.tmdb.org/t/p/original/${movie.data?.poster_path}`} />
                    <Shading />
                    <TextBox>
                        <Text fs='2rem' fw='bold' mb='1rem'>{title}</Text>
                        <Text fs='0.8rem'>평균 &#9733; {movie.data?.vote_average.toFixed(1)}</Text>
                        <Text fs='0.8rem'>{movie.data?.release_date.substr(0, 4)}</Text>
                        <Text fs='0.8rem' mb='1rem'>{movie.data?.runtime}분</Text>
                        <Text fs='1.2rem' mb='1rem'>{movie.data?.tagline}</Text>
                        <Text fs='0.8rem'>{movie.data?.overview}</Text>
                    </TextBox>
                </Banner>
                <Text fs='1.2rem' fw='bold' style={{ margin: '2em', cursor: 'pointer' }}>출연</Text>
                <CastSection>
                    {credits.data?.cast.map((cast) => (
                        <CastBox>
                            <CastProfileImgBox>
                                <CastProfileImg src={cast.profile_path ? `https://image.tmdb.org/t/p/original/${cast.profile_path}` : '../images/empty_black.png'} />
                            </CastProfileImgBox>
                            <Text fs='0.8rem' fw='bold' align='center'>{cast.name}</Text>
                            <Text fs='0.8rem' fw='light' align='center'>{cast.character}</Text>
                        </CastBox>
                    ))}
                </CastSection>
            </>

    }

    return content;
};

const Banner = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 20rem;
    border-radius: 0 1em 1em 0;
    overflow: hidden;
    position: relative;
`

const BannerImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
`

const Shading = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, black, transparent);
    z-index: 2;
    position: absolute;
`

const TextBox = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    z-index: 3;
    width: 60%;
    height: 20rem;
    padding: 2em;
    border-bottom: 3px solid white;
`
const Text = styled.p`
    position: relative;
    font-size: ${props => props.fs || '1rem'};
    font-weight: ${props => props.fw || 'normal'};
    text-align: ${props => props.align || 'justify'};
    z-index: 3;
    padding: 0;
    margin: 0;
    margin-bottom: ${props => props.mb || 0};
`

const CastSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 1em;
    padding: 0;
`

const CastBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 8em;
    margin-bottom: 1em;
`

const CastProfileImgBox = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 1px solid white;
`

const CastProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export default Details;