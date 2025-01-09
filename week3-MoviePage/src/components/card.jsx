import * as S from './style.js'
import styled from 'styled-components';

// 영화 제목의 길이가 10글자를 초과할 경우 8글자로 잘라내고 '...'을 붙여 출력
let length = 10;
const subTitleString = (text) => {
    if (text.length > length){
        text = text.substr(0, length-2) + '...'
    }
    return text;
}

// 영화 리스트를 출력하는 컴포넌트
const Card = (props) => {
    console.log(props)
    return (
        <Item>
            <ImageBox>
                <S.StyledCard src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`}>
                </S.StyledCard>
            </ImageBox>
            <MovieText textsize='0.9rem' margin='15px' weight='bold'>{subTitleString(props.movie.title)}</MovieText>
            <MovieText textsize='0.7rem' margin='0px'weight='normal'>{props.movie.release_date}</MovieText>
        </Item>
    )
}

const ImageBox = styled.div`
    width: 9rem;
    height: 200px;
    overflow:hidden;
    border-radius: 10px;
`

const Item = styled.div`
    & {
        height: 240px;
        margin: 0 5px 20px 5px;
        position: relative;
    }

    &:hover {
        cursor: pointer;
    }
`

const MovieText = styled.p`
    position: absolute;
    font-weight: ${props => props.weight};
    font-size: ${props => props.textsize};
    bottom: ${props => props.margin};
    margin: 0;
`

export default Card