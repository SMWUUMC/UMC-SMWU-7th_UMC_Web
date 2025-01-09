import styled from "styled-components";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>UMC PlayList</FooterText>
        </FooterContainer>
    );
}

export default Footer;

const FooterContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 5rem;
    background-color: #5d3de9;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15rem;
`

const FooterText = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
`