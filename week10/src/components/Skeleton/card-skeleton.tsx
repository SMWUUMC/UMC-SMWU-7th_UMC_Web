// src/components/Skeleton/card-skeleton.tsx
import React from 'react';
import * as S from './card-skeleton.style';

const CardSkeleton: React.FC = () => {
    return (
        <S.Container>
            <S.CardMain />
            <S.TextWrapper>
                <S.TitleBox />
                <S.DescriptionBox />
            </S.TextWrapper>
        </S.Container>
    );
};

export default CardSkeleton;
