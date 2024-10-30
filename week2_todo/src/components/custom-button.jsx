import styled from "styled-components";

const CustomButton = () => {
    return (
        <FirstStyledSweetPotato>
            커스텀 고구마 버튼
        </FirstStyledSweetPotato>
    );
};

export default CustomButton;

const FirstStyledSweetPotato = styled.button`
    background-color: purple;
    border: none;
    padding: 0;
    cursor: pointer;
`
