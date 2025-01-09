import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, complete } from "../redux/todoSlice";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import styled from "styled-components";

export default function TodoList() {
    const todolist = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const trash = <FaRegTrashAlt />;

    const todolistView = todolist.map((todo, idx) => (
        <ToDoItem key={todolist[idx].id}>
            <CheckBox
                id={todolist[idx].id}
                name='checkbox'
                type="checkbox"
                onChange={() => dispatch(complete(todolist[idx].id))}
            />
            <Label htmlFor={todolist[idx].id}></Label>
            <div>
                {todo.complete === false ?
                    <>{todo.text}</> : <del>{todo.text}</del>}
            </div>
            <Delete onClick={() => dispatch(remove(todolist[idx].id))}>{trash}</Delete>
        </ToDoItem>
    ));

    return (
        <>
            <ToDoList>{todolistView}</ToDoList>
        </>
    );
}

const ToDoList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const ToDoItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #868686;
    margin: 0 10px;
`

const CheckBox = styled.input`
    width: 0;
    height: 0;

    &:checked + label {
        background-color: #75bfff;
        content: '';
    }
`

const Label = styled.label`
    cursor: pointer;
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #75bfff;
    margin-right: 10px;
`

const Delete = styled.button`
    margin-left: auto;
`