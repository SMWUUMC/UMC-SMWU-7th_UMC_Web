import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import List from '../components/List';
import styled from 'styled-components';
import { useCustomFetch } from '../hooks/useCustomFetch';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 60%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  color: black;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const { getTodos, createTodo, updateTodo, deleteTodo } = useCustomFetch();

  // 초기 ToDo 불러오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, [getTodos]);

  // ToDo 추가
  const addTodo = async (title, content) => {
    try {
      const newTodo = { title, content };
      const createdTodo = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  // ToDo 수정
  const handleUpdateTodo = async (id, newTitle, newContent) => {
    try {
      const updatedTodo = await updateTodo(id, { title: newTitle, content: newContent });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ToDo 삭제
  const deleteTodoById = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 체크박스 부분 구현
  const handleToggle = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const updatedTodo = await updateTodo(id, { checked: !todo.checked });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? updatedTodo : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HomeContainer>
      <Header>⚡ ToDoList ⚡</Header>
      <Input onAdd={addTodo} />
      <List
        todos={todos}
        onDelete={deleteTodoById}
        onUpdate={handleUpdateTodo}
        onToggle={handleToggle}
      />
    </HomeContainer>
  );
};

export default Home;
