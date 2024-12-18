// src/components/Skeleton/card-list-skeleton.tsx
import React from 'react';
import CardSkeleton from './card-skeleton';

const CardListSkeleton: React.FC = () => {
    return (
        <>
            {new Array(20).fill(0).map((_, idx) => (
                <CardSkeleton key={idx} />
            ))}
        </>
    );
};

export default CardListSkeleton;
