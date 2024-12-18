// src/components/Skeleton/card-skeleton.style.ts
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const skeleton = keyframes`
    0% {
        opacity: 1;
    }
    30% {
        opacity: 0.7;
    }
    50% {
        opacity: 0.4;
    }
    80% {
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
`;

// 스타일 컴포넌트 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const CardMain = styled.div`
    width: 140px;
    height: 210px;
    background: lightgray;
    border-radius: 10px;
    overflow: hidden;
    animation: ${skeleton} 3s 1s infinite linear alternate;
`;

const TextWrapper = styled.div`
    width: 140px;
    height: 30px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 5px;
`;

const TitleBox = styled.div`
    background: lightgray;
    height: 14px;
    border-radius: 5px;
    animation: ${skeleton} 3s 1s infinite linear alternate;
`;

const DescriptionBox = styled.div`
    background: lightgray;
    height: 10px;
    border-radius: 5px;
    animation: ${skeleton} 3s 1s infinite linear alternate;
`;

// styled-components는 기본적으로 타입 추론을 지원하므로 별도의 타입 정의는 필요하지 않습니다. 
// 이 방식으로 컴포넌트는 타입 추론을 통해 안전하게 사용될 수 있습니다.

export { Container, CardMain, TextWrapper, TitleBox, DescriptionBox };
