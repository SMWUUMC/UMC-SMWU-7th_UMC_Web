import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/todoSlice';
import styled from 'styled-components';

export default function InputTodos() {
    const dispatch = useDispatch();

    const [todolist, setTodolist] = useState(
        {
            id: 0,
            text: ''
        }
    );

    function handleText(e) {
        setTodolist({text: e.target.value});
    }

    function onReset() {
        setTodolist({text: ''});
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (todolist.text.trim !== '') {
                    dispatch(add(todolist.text));
                    console.log(todolist.complete);
                } else {
                    alert('할 일을 입력해주세요.');
                }
                onReset();
            }}>
                <div>
                    <Input
                        type="text"
                        value={todolist.text}
                        onChange={handleText}
                        placeholder="할 일을 입력해주세요."
                    />
                    <Submit type="submit" value='+'></Submit>
                </div>
            </form>
        </div>
    )
}

const Input = styled.input`
    box-sizing: border-box;
    width: 200px;
    height: 30px;
    margin: 10px;
    padding: 5px;
    border-radius: 2px;
    border: 1px solid #868686;
    font-size: 16px;
    outline: none;
`

const Submit = styled.input`
    box-sizing: border-box;
    width: 50px;
    height: 30px;
    margin: 10px;
    padding: 5px;
    border-radius: 2px;
    border: 1px solid #868686;
    color: #868686;
    background-color: white;
    font-size: 16px;
    outline: none;
`