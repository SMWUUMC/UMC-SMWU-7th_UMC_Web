import ToDoInputs from "../components/ToDoInputs";
import styled from "styled-components";
import ToDoItem from "../components/ToDoItem";

const MainPage = () => {

    return (
        <PageContainer>
            <ToDoInputs></ToDoInputs>
            <ToDoItem></ToDoItem>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    height: 100vh;
    width: 50vw;
    max-width: 500px;
`

export default MainPage;