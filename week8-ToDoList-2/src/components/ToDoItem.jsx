import { useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const ToDoItem = ({ toDo }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { patchToDo, deleteToDo } = useCustomFetch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('')
    const [editedContent, setEditedContent] = useState('')

    const handleCheck = useMutation({
        mutationFn: async () => {
            await patchToDo({
                "id": toDo.id,
                "checked": !toDo.checked
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['toDos']);
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const handleDelete = useMutation({
        mutationFn: async () => {
            await deleteToDo(toDo)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['toDos']);
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const changeEditState = (e) => {
        e.stopPropagation()
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
    }

    const isInputEmpty = () => {
        return editedTitle.trim() === '' || editedContent.trim() === ''
    }

    return (
        <ItemContainer $completed={toDo.checked}>
            <input
                type="checkbox"
                defaultChecked={toDo.checked}
                onClick={
                    (e) => {
                        e.stopPropagation();
                        handleCheck.mutate()
                    }
                }
            />
            {!isEditing ? (
                <ContentContainer onClick={() => navigate(`/detail/${toDo.id}`, {
                    replace: false,
                })}>
                    <TextContainer>
                        <Text>{toDo.title}</Text>
                        <Text size="0.8rem" color="#505050">{toDo.content}</Text>
                    </TextContainer>
                    <ButtonContainer>
                        <Button
                            onClick={(e) => changeEditState(e, toDo)}
                        >수정</Button>
                        <Button
                            onClick={
                                (e) => { e.stopPropagation(); handleDelete.mutate() }
                            }
                        >삭제</Button>
                    </ButtonContainer>
                </ContentContainer>
            ) : (
                <ContentContainer>
                    <TextContainer>
                        <input type="text" name="title" value={editedTitle} onChange={(e) => handleInput(e)}></input>
                        <input type="text" name="content" value={editedContent} onChange={(e) => handleInput(e)}></input>
                    </TextContainer>
                    <ButtonContainer>
                        <Button onClick={(e) => changeEditState(e)}>취소</Button>
                        <Button onClick={(e) => { 
                            e.stopPropagation()
                            handleEdit.mutate()
                         }} disabled={isInputEmpty()}>수정 완료</Button>
                    </ButtonContainer>
                </ContentContainer>)
            }
        </ItemContainer>
    )
}

const ItemContainer = styled.div`
    display: flex;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    background-color: ${props => props.$completed ? '#ccc' : 'white'};
    margin: 0.5rem 0;
`

const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    text-align: left;
`

const Text = styled.div`
    font-size: ${props => props.size || '1rem'};
    color: ${props => props.color || '#000'};
`

const ButtonContainer = styled.div`
    display: flex;
    margin-left: auto;
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

export default ToDoItem;