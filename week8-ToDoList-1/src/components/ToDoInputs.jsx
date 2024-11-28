import styled from 'styled-components';
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useState } from 'react';

const ToDoInputs = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const {postToDo} = useCustomFetch()

    const handleInput = (e) => {
        const {name, value} = e.target
        if(name === 'title') {
            setTitle(value)
        } else {
            setContent(value)
        }
        console.log(title, content)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
        const toDo = {
            title: title,
            content: content
        }
        postToDo(toDo)
        setTitle('')
        setContent('')
    }

    const isInputEmpty = () => {
        return title.trim() === '' || content.trim() === ''
    }

    return (
        <InputWrapper>
            <Title>To Do List!</Title>
            <Input name='title' type="text" placeholder='제목' onChange={(e) => handleInput(e)} value={title}></Input>
            <Input name='content' type="text" placeholder='내용' onChange={(e) => handleInput(e)} value={content}></Input>
            <Button type="submit" value="추가" onClick={handleSubmit} disabled={isInputEmpty()}></Button>
        </InputWrapper>
    )
}

const InputWrapper = styled.form`
    height: 150px;
    display: flex;
    flex-direction: column;
    width: 50%;
    position: fixed;
    top: 0;
    padding: 3rem;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Title = styled.h3`
    margin-top: 0.5rem;
`

const Input = styled.input`
    border-radius: 0.2rem;
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin-bottom: 0.2rem;
    flex-grow: 1;
`

const Button = styled.input`
    border-radius: 0.2rem;
    border: 1px solid #ccc;
    padding: 0.5rem;
    background-color: #fff;
    cursor: pointer;
    margin-top: 0.2rem;
`

export default ToDoInputs;