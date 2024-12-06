import * as S from "./movie-detail-skeleton.style.js";
import CreditListSkeleton from "../credit-list-skeleton.jsx";
import { CreditGridContainer } from "./movie-detail.style.js";

const MovieDetailSkeleton = () => {
  return (
    <S.Container>
      <S.MoviePoster />
      <S.TextWrapper />
      <div style={{ marginLeft: "23px" }}>
        <S.CreditImg />
        <S.CreditText />
      </div>
      <S.TextWrapper />
      <CreditGridContainer>
        <CreditListSkeleton number={20} />
      </CreditGridContainer>
    </S.Container>
  );
};

export default MovieDetailSkeleton;
