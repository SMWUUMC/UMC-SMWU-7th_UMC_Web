import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryButton = (props) => {
    console.log(props.seed);
    return (
        <CategoryImage seed={props.seed} to={props.to}>
            <CategoryTextBox>
                {props.value}
            </CategoryTextBox>
        </CategoryImage>
    );
}

const CategoryImage = styled(Link)`
    background-image: url('https://picsum.photos/seed/${props=>props.seed}/250/130');
    width: 250px;
    height: 100px;
    border-radius: 5px;
    flex-basis: 250px;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 10px 20px 10px;
    text-decoration: none;
`

const CategoryTextBox = styled.p`
    width: fit-content;
    height: 20px;
    padding: 0 5px 0 5px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    position: relative;
    left: 5px;
    top: 65px;
    text-align: left;
    font-size: 0.7rem;
    color: white;
`


export default CategoryButton