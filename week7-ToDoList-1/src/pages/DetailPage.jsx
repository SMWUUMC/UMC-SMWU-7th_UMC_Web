import useCustomGet from "../hooks/useCustomGet";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    const params = useParams()
    const { data, isLoading, isError } = useCustomGet(`http://localhost:3000/todo/${params.id}`)

    console.log(data?.data)

    return (
        isLoading ? <div>로딩중</div> :
            data.data === undefined ? <div>에러발생</div> :
                <div>
                    <h1>{data.data.title}</h1>
                    <p>{data.data.content}</p>
                </div>
    );
}

export default DetailPage;