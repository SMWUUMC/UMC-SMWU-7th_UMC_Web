import CardSkeleton from "./card-skeleton";

const CardListSkeleton = ({ number }) => {
  return Array(number)
    .fill(0)
    .map((_, idx) => <CardSkeleton key={idx} />);
};

export default CardListSkeleton;
