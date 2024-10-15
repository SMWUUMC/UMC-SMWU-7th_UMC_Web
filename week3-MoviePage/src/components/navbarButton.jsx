import styled from "styled-components";
import { Link } from "react-router-dom";

// NavBar의 링크 컴포넌트
export const NavbarButton = (props) => {
    console.log(props)
    return (
        <StyledButton 
            to={props.to} 
            margin={props.margin} 
            textcolor={props.textcolor} 
            backgroundcolor={props.backgroundcolor} 
            weight={props.weight} 
            left={props.left} 
            right={props.right}
        >
            {props.text}
        </StyledButton>
    )
}

const StyledButton = styled(Link)`
    width: fit-content;
    position: absolute;
    left: ${props => props.left || 'auto'};
    right: ${props => props.right || 'auto'};
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    margin: ${props => props.margin || 0};
    color: ${props => props.textcolor || 'white'};
    background-color: ${props => props.backgroundcolor || 'transparent'};
    font-weight: ${props => props.weight || 'normal'};
    text-decoration: none;
    transition: filter 0.5s;

    &:hover {
        filter: drop-shadow(0 0 0.75rem #c40c49);
    }
`

export const HoverNavbarButton = (props) => {
    return (
        <HoverStyledButton 
            to={props.to} 
            margin={props.margin} 
            textcolor={props.textcolor} 
            backgroundcolor={props.backgroundcolor} 
            weight={props.weight} 
            left={props.left} 
            right={props.right}
        >
            {props.text}
        </HoverStyledButton>
    )
}

export const HoverStyledButton = styled(StyledButton)`
    &:hover {
        filter: brightness(0.5);
    }
`

export default NavbarButton;