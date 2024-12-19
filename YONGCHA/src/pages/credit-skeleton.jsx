import * as S from "./MovieDetail/movie-detail-skeleton.style.js";

const CreditSkeleton = () => {
  return (
    <div style={{ justifyItems: "center", padding: "3px" }}>
      <S.CreditImg />
      <S.CreditText />
      <S.CreditText />
    </div>
  );
};

export default CreditSkeleton;
