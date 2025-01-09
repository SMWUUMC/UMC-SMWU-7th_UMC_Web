import styled from "styled-components";
import { useEffect, useState } from "react";
import ToDoInputs from "../components/ToDoInputs";
import { useCustomFetch } from "../hooks/useCustomFetch";
import ToDoList from "../components/ToDoList";
import { SyncLoader } from "react-spinners";
import { useRef } from "react";

const MainPage = () => {

    const { getToDos, postToDo } = useCustomFetch()
    const [toDos, setToDos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const createToDo = () => {
        postToDo()
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const toDos = await getToDos()
                setToDos(toDos[0])
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [getToDos])

    return (
        <PageContainer>
            <ToDoInputs></ToDoInputs>
            {/* {
                isLoading ?
                    <SyncLoader color={"#36D7B7"} loading={isLoading} size={10} margin={10}></SyncLoader> :
                    <ToDoList items={toDos}></ToDoList>
            } */}
            <ToDoList items={toDos}></ToDoList>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 50vw;
    max-width: 500px;
`

export default MainPage;