import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  return <h1>id {id}의 디테일 페이지</h1>;
};

export default Detail;
