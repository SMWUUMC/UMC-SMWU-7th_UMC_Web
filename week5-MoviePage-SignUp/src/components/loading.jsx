import styled from "styled-components";
import {keyframes} from "styled-components";

// 로딩 중에 좌우로 움직이는 로딩 바를 보여주는 컴포넌트
const Loading = () => {
    return (
        <Container>
            {/* <div>로딩중...</div> */}
            <LoadingBar>
                <LoadingBarInside></LoadingBarInside>
            </LoadingBar>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-self: center;
    justify-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
`
const LoadingBar = styled.div`
    width: 10rem;
    height: 0.5rem;
    border-radius: 2rem;
    overflow: hidden;
    background-color: black;
    margin-top: 10rem;
`
const LoadingBarMoving = keyframes`
    from {
        margin-left: 0%;
    }

    25% {
        width: 0.5rem;
    }

    50% {
        width: 1rem;
    }

    75% {
        width: 0.5rem;
    }

    to {
        margin-left: 90%;
    }
`
const LoadingBarInside = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 2rem;
    object-fit: cover;
    background-color: #FF0558;
    animation: ${LoadingBarMoving} 1.5s infinite alternate;
    animation-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
`

export default Loading