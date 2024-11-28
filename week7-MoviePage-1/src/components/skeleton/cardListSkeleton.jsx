import * as S from '../style.js';
import CardSkeleton from './cardSkeleton.jsx';

const CardListSkelton = ({movies}) => {
    
    console.log(movies);

    return (
        <S.CardList>
            {new Array(20).fill(0).map((_, index) => <CardSkeleton/>)}
        </S.CardList>
    )
};

export default CardListSkelton