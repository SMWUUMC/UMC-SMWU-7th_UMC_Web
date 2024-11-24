import styled from "styled-components"

const SearchContainer=styled.div`
    display: flex;
    justify-content: center;
    margin: 50px 10px 0 150px;

    input{
        flex:1;
        padding: 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
    };

    button{
        width: 80px;
        background-color: #f82f63;
        color: white;
        cursor: pointer;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        &:hover{
            background-color: grey;
        };
    };
`;

const MovieGridContainer=styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap:15px;
`;

const NosearchContainer=styled.div`
    textalign: center;
    margin-top:30px;
    color: white;
`;
export {SearchContainer, MovieGridContainer, NosearchContainer}