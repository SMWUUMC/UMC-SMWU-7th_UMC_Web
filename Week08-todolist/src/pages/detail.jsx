import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
  }

  .update {
    background-color: #e0e0e0;
    color: #333;

    &:hover {
      background-color: #bdbdbd;
    }
  }

  .delete {
    background-color: #e0e0e0;
    color: #333;

    &:hover {
      background-color: #bdbdbd;
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { getTodoById, updateTodo, deleteTodo } = useCustomFetch();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchTodoDetail = async () => {
      try {
        const data = await getTodoById(id);
        setTodo(data);
        setEditedTitle(data.title || '');
        setEditedContent(data.content || '');
      } catch (error) {
        setError('오류');
        console.error(error);
      }
    };

    fetchTodoDetail();
  }, [id, getTodoById]);

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      navigate('/');
    } catch (error) {
      setError('오류');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTodo(id, {
        title: editedTitle,
        content: editedContent,
      });
      setIsEditing(false);
      const updatedTodo = await getTodoById(id);
      setTodo(updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

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
        {isEditing ? (
          <>
            <Input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <Input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <ButtonContainer>
              <button className="update" onClick={handleUpdate}>
                저장
              </button>
              <button className="delete" onClick={() => setIsEditing(false)}>
                취소
              </button>
            </ButtonContainer>
          </>
        ) : (
          <>
            <h2>{todo.title}</h2>
            <p>{todo.content}</p>
            <p>생성일: {new Date(todo.createdAt).toLocaleString()}</p>
            <p>수정일: {new Date(todo.updatedAt).toLocaleString()}</p>
            <p>
              상태: <span className="status" checked={todo.checked}>{todo.checked ? '완료' : '미완료'}</span>
            </p>
            <ButtonContainer>
              <button className="update" onClick={() => setIsEditing(true)}>
                수정
              </button>
              <button className="delete" onClick={handleDelete}>
                삭제
              </button>
            </ButtonContainer>
          </>
        )}
      </DetailBox>
    </DetailContainer>
  );
};

export default Detail;
