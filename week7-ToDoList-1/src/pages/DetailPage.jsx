import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DetailPage = () => {
    const { id } = useParams()
    const { getToDoById, patchToDo, deleteToDo } = useCustomFetch()
    const [toDo, setToDo] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState('')
    const [editedContent, setEditedContent] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const toDo = await getToDoById(id)
                setToDo(toDo)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [getToDoById])

    const handleDelete = async (e, toDo) => {
        navigate('/', {
            replace: false,
        })
        e.stopPropagation()
        try {
            const r = deleteToDo({
                "id": toDo.id
            })
        } catch (error) {
            console.error(error)
        }
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
        <PageContainer>
            {
                !isEditing ?
                    <>
                        <Text weight="bold" size="3rem">{toDo.title}</Text>
                        <Text>{toDo.content}</Text>
                        <ButtonContainer>
                            <Button onClick={(e) => changeEditState(e)}>수정</Button>
                            <Button onClick={(e) => handleDelete(e, toDo)}>삭제</Button>
                        </ButtonContainer>
                    </>
                    :
                    <>
                        <Input weight="bold" size="3rem" type="text" name="title" value={editedTitle} onChange={(e) => handleInput(e)}></Input>
                        <Input type="text" name="content" value={editedContent} onChange={(e) => handleInput(e)}></Input>
                        <ButtonContainer>
                            <Button onClick={(e) => changeEditState(e)}>취소</Button>
                            <Button onClick={(e) => handleEdit(e, toDo)} disabled={isInputEmpty()}>수정 완료</Button>
                        </ButtonContainer>
                    </>
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