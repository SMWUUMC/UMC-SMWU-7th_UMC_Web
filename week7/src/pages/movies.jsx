import React from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useMovies from '../../hooks/useMovies'; // useMovies 훅을 import
import { useNavigate } from 'react-router-dom';

const MoviesPage = () => {
    const navigate = useNavigate();
    const {
        data: nowPlayingData,
        isLoading: isLoadingNowPlaying,
        error: errorNowPlaying,
        hasNextPage: hasNextPageNowPlaying,
        fetchNextPage: fetchNextPageNowPlaying,
        isFetchingNextPage: isFetchingNextPageNowPlaying,
    } = useMovies('now_playing');

    const {
        data: popularData,
        isLoading: isLoadingPopular,
        error: errorPopular,
        hasNextPage: hasNextPagePopular,
        fetchNextPage: fetchNextPagePopular,
        isFetchingNextPage: isFetchingNextPagePopular,
    } = useMovies('popular');

    const {
        data: topRatedData,
        isLoading: isLoadingTopRated,
        error: errorTopRated,
        hasNextPage: hasNextPageTopRated,
        fetchNextPage: fetchNextPageTopRated,
        isFetchingNextPage: isFetchingNextPageTopRated,
    } = useMovies('top_rated');

    const {
        data: upcomingData,
        isLoading: isLoadingUpcoming,
        error: errorUpcoming,
        hasNextPage: hasNextPageUpcoming,
        fetchNextPage: fetchNextPageUpcoming,
        isFetchingNextPage: isFetchingNextPageUpcoming,
    } = useMovies('upcoming');

    // 로딩 중, 에러 처리
    if (isLoadingNowPlaying || isLoadingPopular || isLoadingTopRated || isLoadingUpcoming) {
        return <div>로딩 중...</div>;
    }

    if (errorNowPlaying || errorPopular || errorTopRated || errorUpcoming) {
        return <div>영화 데이터를 불러오는 데 문제가 발생했습니다.</div>;
    }

    const getImageUrl = (movies, fallbackImage) => {
        // 영화 목록에서 첫 번째 영화의 포스터 이미지를 가져오고, 없으면 fallbackImage 사용
        return movies && movies.length > 0 ? `https://image.tmdb.org/t/p/w500${movies[0].poster_path}` : fallbackImage;
    };

    return (
        <ImageContainer>
            <LinkWrapper to="/movies/now-playing">
                <ImageBox imageUrl={getImageUrl(nowPlayingData?.pages[0]?.results, '/path/now-playing-image.jpg')}>
                    <ImageLink>현재 상영중인</ImageLink>
                </ImageBox>
                {hasNextPageNowPlaying && (
                    <LoadMoreButton onClick={() => fetchNextPageNowPlaying()}>
                        {isFetchingNextPageNowPlaying ? '로딩 중...' : '더 보기'}
                    </LoadMoreButton>
                )}
            </LinkWrapper>

            <LinkWrapper to="/movies/popular">
                <ImageBox imageUrl={getImageUrl(popularData?.pages[0]?.results, '/path/popular-image.jpg')}>
                    <ImageLink>인기있는</ImageLink>
                </ImageBox>
                {hasNextPagePopular && (
                    <LoadMoreButton onClick={() => fetchNextPagePopular()}>
                        {isFetchingNextPagePopular ? '로딩 중...' : '더 보기'}
                    </LoadMoreButton>
                )}
            </LinkWrapper>

            <LinkWrapper to="/movies/top-rated">
                <ImageBox imageUrl={getImageUrl(topRatedData?.pages[0]?.results, '/path/top-rated-image.jpg')}>
                    <ImageLink>높은 평가를 받은</ImageLink>
                </ImageBox>
                {hasNextPageTopRated && (
                    <LoadMoreButton onClick={() => fetchNextPageTopRated()}>
                        {isFetchingNextPageTopRated ? '로딩 중...' : '더 보기'}
                    </LoadMoreButton>
                )}
            </LinkWrapper>

            <LinkWrapper to="/movies/up-coming">
                <ImageBox imageUrl={getImageUrl(upcomingData?.pages[0]?.results, '/path/up-coming-image.jpg')}>
                    <ImageLink>개봉 예정중인</ImageLink>
                </ImageBox>
                {hasNextPageUpcoming && (
                    <LoadMoreButton onClick={() => fetchNextPageUpcoming()}>
                        {isFetchingNextPageUpcoming ? '로딩 중...' : '더 보기'}
                    </LoadMoreButton>
                )}
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

const ImageBox = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    background-image: url(${props => props.imageUrl});
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

const LoadMoreButton = styled.button`
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;

    &:disabled {
        background-color: #d3d3d3;
        cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
        background-color: #45a049;
    }
`;
