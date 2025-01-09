import styled, {keyframes} from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 영화 제목의 길이가 10글자를 초과할 경우 8글자로 잘라내고 '...'을 붙여 출력
let length = 10;
const subTitleString = (text) => {
    if (text.length > length) {
        text = text.substr(0, length - 2) + '...'
    }
    return text;
}

// 영화 리스트를 출력하는 컴포넌트
const CardSkeleton = (props) => {
    const navigate = useNavigate();
    return (
        <Item>
            <ImageBox>
            </ImageBox>
            <MovieText height='0.9rem' margin='15px'></MovieText>
            <MovieText height='0.7rem' margin='0px'></MovieText>
        </Item>
    )
}

const skeletonGradientWave = keyframes`
    to {
        background-position-x: -200%;
    }
`

const ImageBox = styled.div`
    box-sizing: border-box;
    width: 9rem;
    height: 200px;
    overflow:hidden;
    border-radius: 10px;
    border-radius: 4px;

    background-color: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;

    animation: 1.7s ${skeletonGradientWave} linear infinite;
`

const Item = styled.div`
    & {
        height: 240px;
        margin: 0 5px 20px 5px;
        position: relative;
    }
`

const MovieText = styled.p`
    width: 100%;
    position: absolute;
    height: ${props => props.height};
    bottom: ${props => props.margin};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;

    background-color: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;

    animation: 1.7s ${skeletonGradientWave} linear infinite;
`

export default CardSkeleton