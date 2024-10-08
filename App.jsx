import { useState } from 'react';
import './App.css'
import Button from './components/Button';
import Input from './components/Input';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: '투두 만들어보기' },
    { id: 2, task: '희연 혜원 혜윤 건 찬민' },
  ]);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [id, setId] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // 1. 추가하기
  const addTodo = () => {
    if (text.trim()) {
      setTodos((prev) => [
        ...prev,
        { id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, task: text }, // ID 갱신
      ]);
      setText('');
    }
  };

  // 2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 3. 수정하기
  const updateTodo = (id) => {
    if (editText.trim() === '') return;
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: editText } : item)) // 수정된 내용 적용
    );
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="todo-input"
        />
        <Button onClick={addTodo} label="할 일 등록" className="todo-button"/>
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editingId !== todo.id ? (
              <>
               <span>{`${todo.id}. ${todo.task}`}</span>
              </>
            ) : (
              <>
                <span>{todo.id}.</span>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
              </>
            )}
            <Button
              onClick={() => deleteTodo(todo.id)}
              label="삭제하기"
              className="delete-button"
            />
            {editingId === todo.id ? (
              <Button
                onClick={() => updateTodo(todo.id)} // 수정 완료 버튼 클릭 시 updateTodo 호출
                label="수정 완료"
                className="edit-button"
              />
            ) : (
              <Button
                onClick={() => {
                  setEditingId(todo.id); // 수정할 todo의 id를 설정
                  setEditText(todo.task); // 기존 내용을 editText에 설정
                }}
                label="수정 진행"
                className="edit-button"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
        
export default App;