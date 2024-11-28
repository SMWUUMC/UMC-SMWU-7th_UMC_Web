import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext'

const ToDoInputs = () => {
    const {toDo, inputText, handleSubmit, handleInput} = useContext(ToDoContext);

    // const [toDo, setToDo] = useState({
    //     title: '',
    //     content: ''
    // });
    // const { register, handleSubmit } = useForm();

    // let {title, content} = toDo

    console.log("ToDo")
    console.log(toDo)
    console.log("inputText")
    console.log(inputText)

    useCustomFetch('http://localhost:3000/todo')

    // const handleInput = (e) => {
    //     setToDo({
    //         ...toDo,
    //         [e.target.name]: e.target.value
    //     })
    // }

    return (
        <InputWrapper onSubmit={handleSubmit}>
            <Input onChange={handleInput} name='title' type="text" placeholder='제목' value={inputText.title}></Input>
            <Input onChange={handleInput} name='content' type="text" placeholder='내용' value={inputText.content}></Input>
            <Button type="submit" value="추가"></Button>
        </InputWrapper>
    )
}

const InputWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 50%;
    position: fixed;
    top: 0;
    padding: 3rem;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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