import styled from 'styled-components';

export const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;


`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;

    button {
        padding: 5px 10px;
        font-size: 16px;
        border: none;
        background-color: #333;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #555;
        }

        &:disabled {
            background-color: #999;
            cursor: not-allowed;
        }
    }
`;