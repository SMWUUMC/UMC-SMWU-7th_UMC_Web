import CreditSkeleton from "./credit-skeleton";

const CreditListSkeleton = ({ number }) => {
  return Array(number)
    .fill(0)
    .map((_) => <CreditSkeleton />);
};

export default CreditListSkeleton;
