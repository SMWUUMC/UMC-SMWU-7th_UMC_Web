import React from 'react';
import * as S from '../style.js';
import CardSkeleton from './cardSkeleton.jsx';

const CardListSkelton: React.FC = () => {
    
    return (
        <S.CardList>
            {new Array(20).fill(0).map((_, index) => <CardSkeleton/>)}
        </S.CardList>
    )
};

export default CardListSkelton