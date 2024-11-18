import styled from 'styled-components';

export const CardContainer = styled.div`
    width: 135px;
    margin: 6px;
    border-radius: 8px;
`;

export const Poster = styled.img`
    width: 100%;
    height: 28vh;
    border-radius: 8px;

    &:hover {
        transform: scale(1.05); 
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    }
`;

export const MovieTitle = styled.h2`
    font-size: 14px;
    margin-top: 2px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%; 
`;

export const ReleaseDate = styled.p`
    font-size: 0.9em;
    color: #777;
    margin-top: -5px;
`;

export const StyledLink = styled.a`
    text-decoration: none;
    color: inherit;
`;
