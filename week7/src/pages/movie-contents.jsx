import React from 'react';// eslint-disable-line no-unused-vars
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useMovieDetails from '../../hooks/useMoviesdetail';

const MovieContents = () => {
    const { movieId } = useParams();
    const { movie, credits, loading, error } = useMovieDetails(movieId);

    if (loading) return <p>로딩 중입니다...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <MovieHeader>
                {movie.poster_path && (
                    <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                )}
                <MovieInfo>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <p><strong>개봉일:</strong> {movie.release_date}</p>
                    <p><strong>평점:</strong> {movie.vote_average}</p>
                </MovieInfo>
            </MovieHeader>
            <CreditsSection>
                <hr />
                <h3>감독/출연</h3>
                <CastList>
                    {credits.map((actor) => (
                        <ActorCard key={actor.id}>
                            {actor.profile_path ? (
                                <ActorImage
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                />
                            ) : (
                                <DefaultActorImage />
                            )}
                            <p>{actor.name} - {actor.character}</p>
                        </ActorCard>
                    ))}
                </CastList>
            </CreditsSection>
        </Container>
    );
};

export default MovieContents;

const Container = styled.div`
    margin: 50px 10px 0 150px;
    color: #fff;
`;

const MovieHeader = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const Poster = styled.img`
    width: 200px;
    height: auto;
    border-radius: 8px;
    margin-right: 20px;
`;

const MovieInfo = styled.div`
    flex: 1;
`;

const CreditsSection = styled.div`
    margin: 40px 10px 0 0;
    padding: 10px;
`;

const CastList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`;

const ActorCard = styled.div`
    width: 120px;
    text-align: center;
`;

const ActorImage = styled.img`
    width: 80px;
    height: 80px;
    margin-top: -15%;
    border-radius: 50%;
    object-fit: cover;
    background-color: grey;
    border: 1px solid black;
`;

const DefaultActorImage = styled.div`
    width: 80px;
    height: 80px;
    margin-top: -15%;
    border-radius: 50%;
    background-color: black;
`;
