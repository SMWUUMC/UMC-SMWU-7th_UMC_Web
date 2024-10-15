import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledLink = styled(Link)`
    flex-shrink: 0;
    margin: ${props => props.padding || 0};
    text-decoration: none;
    color: white;
    display: block;
`

export default StyledLink