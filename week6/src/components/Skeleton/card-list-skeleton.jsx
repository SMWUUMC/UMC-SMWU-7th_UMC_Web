//src/components/Skeleton/card-list-skeleton.jsx
import CardSkeleton from "./card-skeleton";

const CardListSkeleton = () => {
    return (
        new Array(20).fill(0).map((_,idx) => <CardSkeleton key={idx}/>)
    );
};

export default CardListSkeleton;