import { useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ToDoItem = ({ toDo }) => {

    const navigate = useNavigate();

    const { patchToDo, deleteToDo } = useCustomFetch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('')
    const [editedContent, setEditedContent] = useState('')

    const handleCheck = (e, toDo) => {
        e.stopPropagation()
        patchToDo({
            "id": toDo.id,
            "checked": !toDo.checked
        })
    }

    const handleDelete = (e, toDo) => {
        e.stopPropagation()
        const r = deleteToDo({
            "id": toDo.id
        })
    }

    const changeEditState = (e) => {
        e.stopPropagation()
        console.log('edit')
        setIsEditing(!isEditing)
        setEditedContent(toDo.content)
        setEditedTitle(toDo.title)
    }

    const handleEdit = (e, toDo) => {
        e.stopPropagation()
        console.log('edit')
        patchToDo({
            "id": toDo.id,
            "title": editedTitle,
            "content": editedContent
        })
        setIsEditing(!isEditing)
    }

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
        <ItemContainer completed={toDo.checked}>
            <input
                type="checkbox"
                defaultChecked={toDo.checked}
                onClick={(e) => handleCheck(e, toDo)}
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
                            onClick={(e) => handleDelete(e, toDo)}
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
                        <Button onClick={(e) => handleEdit(e, toDo)} disabled={isInputEmpty()}>수정 완료</Button>
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
    background-color: ${props => props.completed ? '#ccc' : 'white'};
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