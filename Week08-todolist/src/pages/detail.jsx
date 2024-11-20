import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCustomFetch } from '../hooks/useCustomFetch';

const DetailContainer = styled.div`
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

const DetailBox = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

const Detail = () => {
  const { id } = useParams(); // URL의 id를 가져옴
  const { getTodoById } = useCustomFetch(); // custom fetch 훅에서 id로 가져오는 API 사용
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodoDetail = async () => {
      try {
        const data = await getTodoById(id);
        setTodo(data);
      } catch (err) {
        setError('Failed to fetch ToDo details');
        console.error(err);
      }
    };

    fetchTodoDetail();
  }, [id, getTodoById]);

  if (error) {
    return (
      <DetailContainer>
        <p>{error}</p>
      </DetailContainer>
    );
  }

  if (!todo) {
    return (
      <DetailContainer>
        <p>Loading...</p>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <DetailBox>
        <h2>{todo.title}</h2>
        <p>{todo.content}</p>
      </DetailBox>
    </DetailContainer>
  );
};

export default Detail;