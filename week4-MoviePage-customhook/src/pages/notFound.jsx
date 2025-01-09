import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>404 Error</h1>
            <p>찾고 있는 페이지가 존재하지 않습니다.</p>
            <BackToPreviousPage onClick={() => navigate(-1)}>이전 페이지로 돌아가기</BackToPreviousPage>
        </>
    );
}

const BackToPreviousPage = styled.div`
    width: fit-content;
    box-sizing: border-box;
    color: #FF0558;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

export default NotFoundPage