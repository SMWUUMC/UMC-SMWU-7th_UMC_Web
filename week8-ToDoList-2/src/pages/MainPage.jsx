import styled from "styled-components";
import { useEffect, useState } from "react";
import ToDoInputs from "../components/ToDoInputs";
import { useCustomFetch } from "../hooks/useCustomFetch";
import ToDoList from "../components/ToDoList";
import { SyncLoader } from "react-spinners";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

const MainPage = () => {

    const { getToDos } = useCustomFetch()
    const [toDos, setToDos] = useState([])

    const { data, isLoading, isError } = useQuery({
        queryKey: ['toDos'],
        queryFn: getToDos,
    })

    return (
        <PageContainer>
            <ToDoInputs></ToDoInputs>
            {
                isLoading ?
                    <SyncLoader color={"#36D7B7"} loading={isLoading} size={10} margin={10}></SyncLoader> :
                    isError ?
                        <div>에러가 발생했습니다.</div> :
                        <ToDoList items={data[0]}></ToDoList>
            }
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