import React from 'react';
import Item from './Item';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ListContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const List = ({ todos, onDelete, onToggle, onUpdate }) => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/detail/${id}`); // 아이템 클릭 시 상세 페이지로 이동
  };

  return (
    <ListContainer>
      {todos.map((todo) => (
        <Item
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onClick={() => handleItemClick(todo.id)} // 클릭 이벤트 추가
        />
      ))}
    </ListContainer>
  );
};

export default List;