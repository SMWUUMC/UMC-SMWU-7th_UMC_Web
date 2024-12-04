import styled, { keyframes } from "styled-components";

const skeleton = keyframes`
  0% {
    opacity:1;
  } 30% {
    opacity:0.7;
  } 50% {
    opacity:0.4;
  } 80% {
    opacity:0.8;
  } 100% {
    opacity:1;
  }`;

const Container = styled.div`
  padding-left: 20px;
`;

const MoviePoster = styled.div`
  height: 300px;
  width: calc(100vw - 150px);
  background: rgb(230, 230, 230);
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

const TextWrapper = styled.div`
  width: 100px;
  height: 27px;
  margin-top: 19.9px;
  margin-bottom: 19.9px;
  background: rgb(230, 230, 230);
  border-radius: 2px;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

const CreditImg = styled.div`
  width: 50px;
  height: 50px;
  background: rgb(230, 230, 230);
  border: 1px white solid;
  border-radius: 25px;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

const CreditText = styled.div`
  width: 90px;
  height: 12px;
  background: rgb(230, 230, 230);
  border-radius: 2px;
  margin-top: 11px;
  margin-bottom: 11px;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

export { Container, MoviePoster, TextWrapper, CreditImg, CreditText };
