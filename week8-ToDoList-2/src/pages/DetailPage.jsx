import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const DetailPage = () => {
    const { id } = useParams()
    const { getToDoById, patchToDo, deleteToDo } = useCustomFetch()
    // const [toDo, setToDo] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState('')
    const [editedContent, setEditedContent] = useState('')
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const { data:toDo, isLoading, isError } = useQuery({
        queryKey: ['toDo', id],
        queryFn: () => getToDoById(id)
    })
    
    const handleDelete = useMutation({
        mutationFn: async () => {
            await deleteToDo(toDo)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['toDos']);
            navigate('/', {
                replace: false,
            })
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const changeEditState = (e) => {
        e.stopPropagation()
        console.log('edit')
        setIsEditing(!isEditing)
        setEditedContent(toDo.content)
        setEditedTitle(toDo.title)
    }

    const handleEdit = useMutation({
        mutationFn: async () => {
            await patchToDo({
                "id": toDo.id,
                "title": editedTitle,
                "content": editedContent
            })
        },
        onSuccess: () => {
            setIsEditing(false);
            queryClient.invalidateQueries(['toDos'])
        }
    })

    const handleInput = (e) => {
        e.stopPropagation()
        const { name, value } = e.target
        if (name === 'title') {
            setEditedTitle(value)
        } else {
            setEditedContent(value)
        }
        console.log(editedTitle, editedContent)
    }

    const isInputEmpty = () => {
        return editedTitle.trim() === '' || editedContent.trim() === ''
    }

    return (
        <PageContainer>
            {
                !isLoading ? !isEditing ?
                    <>
                        <Text weight="bold" size="3rem">{toDo.title}</Text>
                        <Text>{toDo.content}</Text>
                        <ButtonContainer>
                            <Button onClick={(e) => changeEditState(e)}>수정</Button>
                            <Button onClick={
                                (e) => { e.stopPropagation(); handleDelete.mutate() }
                            }>삭제</Button>
                        </ButtonContainer>
                    </>
                    :
                    <>
                        <Input weight="bold" size="3rem" type="text" name="title" value={editedTitle} onChange={(e) => handleInput(e)}></Input>
                        <Input type="text" name="content" value={editedContent} onChange={(e) => handleInput(e)}></Input>
                        <ButtonContainer>
                            <Button onClick={(e) => changeEditState(e)}>취소</Button>
                            <Button onClick={(e) => { 
                            e.stopPropagation()
                            handleEdit.mutate()
                         }} disabled={isInputEmpty()}>수정 완료</Button>
                        </ButtonContainer>
                    </>
                    : <Text>로딩중...</Text>
            }
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 50vw;
    padding: 3rem;
    max-width: 500px;
`

const Text = styled.div`
    font-size: ${(props) => props.size || '1rem'};
    font-weight: ${(props) => props.weight || 'normal'};
    text-align: left;
    padding-bottom: 1rem;
`

const ButtonContainer = styled.div`
    display: flex;
    margin-left: auto;
`

const Input = styled.input`
    margin-bottom: 1rem;
    width: 100%;
    font-size: ${(props) => props.size || '1rem'};
    font-weight: ${(props) => props.weight || 'normal'};
`

const Button = styled.button`
    margin-left: 1rem;
    border: 1px solid #ccc;
    width: fit-content;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`


export default DetailPage;