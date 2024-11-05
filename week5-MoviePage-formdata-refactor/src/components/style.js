import styled from 'styled-components';

export const CardList = styled.ul`
    width: 95%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, 9rem);
    /* 가로 정렬 */
    justify-content: space-between; 
    margin: 0;
    padding: 0;
`

export const StyledCard = styled.img`
    & {
        width: 100%;
        object-fit: cover;
        transition: transform 0.5s;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`

export const Card = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

