import { useState } from 'react'
import TodoList from './components/TodoList'
import InputTodos from './components/InputTodo'
import styled from 'styled-components'
import './App.css'

function App() {
    const [time, setTime] = useState('00:00:00');

    const currentTime = () => {
        const today = new Date();
        const hours = today.getHours() > 9 ? today.getHours() : '0' + today.getHours();
        const minutes = today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
        const seconds = today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();
        const formatTime = `${hours}:${minutes}:${seconds}`;
        setTime(formatTime);
    }

    setInterval(currentTime, 1000);

    return (
        <Container>
            <TopBar>
                <Time>{time}</Time>
            </TopBar>
            <Text>Todo List</Text>
            <InputTodos></InputTodos>
            <TodoList></TodoList>
        </Container>
    )
}

export default App

const Container = styled.div`
    border: 10px solid #2f2f2f;
    border-radius: 5px;
    width: 300px;
    height: 500px;
`

const TopBar = styled.div`
    display: flex;
    background-color: #7d7d7d;
    color: white;
    height: 20px;
    align-items: center;
    padding: 2px;
`
const Text = styled.div`
    margin-left: 15px;
    font-weight: bold;
    text-align: left;
    margin-top: 10px;
`

const Time = styled.div`
    margin-left: 15px;
`