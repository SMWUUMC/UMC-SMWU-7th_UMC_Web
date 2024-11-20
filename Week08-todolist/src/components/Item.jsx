import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TodoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  font-size: 14px;
  margin-top: 5px;

  strong {
    font-size: 14px;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    color: #555;
    margin: 0;
  }
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #e0e0e0;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  margin-left: 7px;
  margin-right: 5px;

  &:hover {
    background-color: #bdbdbd;
  }

  &.delete {
    background-color: #e0e0e0;

    &:hover {
      background-color: #bdbdbd;
    }
  }
`;

const Input = styled.input`
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 4px;
`;

const Item = ({ todo, onDelete, onToggle, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedContent, setEditedContent] = useState(todo.content);
    const navigate = useNavigate();

    const handleSave = () => {
        if (!editedTitle.trim() || !editedContent.trim()) {
            return;
        }
        onUpdate(todo.id, editedTitle, editedContent);
        setIsEditing(false);
    };

    const handleItemClick = () => {
      if (!isEditing) {
        navigate(`/detail/${todo.id}`); // 상세 페이지 이동
      }
    };
  
    return (
      <TodoItemContainer onClick={handleItemClick}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={todo.checked}
            onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 페이지 안 넘어가도록
            onChange={() => onToggle(todo.id)} // 체크박스 상태 변경
          />
          {isEditing ? (
            <TextContainer>
              <Input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <Input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </TextContainer>
          ) : (
            <TextContainer>
              <strong>{todo.title}</strong>
              <p>{todo.content}</p>
            </TextContainer>
          )}
        </span>
        <div>
          {isEditing ? (
            <StyledButton
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            >
              수정완료
            </StyledButton>
          ) : (
            <StyledButton
              onClick={(e) => {
                e.stopPropagation(); 
                setIsEditing(true);
              }}
            >
              수정
            </StyledButton>
          )}
          <StyledButton
            className="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
          >
            삭제
          </StyledButton>
        </div>
      </TodoItemContainer>
    );
  };
  
  export default Item;
