import { useState } from 'react';
import './App.css';
import Button from './Button'; // Button 컴포넌트 불러오기
import Input from './Input';   // Input 컴포넌트 불러오기

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editingText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (text.trim().length === 0) {
      alert('제대로 입력해라!');
      return;
    }
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

  return (
    <>
      <form className="todoForm" onSubmit={handleSubmit}>
        <Input
          className="textbox"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button className="todo" onClick={addTodo} type="submit">
          할 일 등록
        </Button>
      </form>

      <div>
        {todos.map((todo) => (
          <div key={todo.id} style={{ display: 'flex', gap: '5px' }}>
            {editingId !== todo.id && (
              <div style={{ color: 'white', display: 'flex', gap: '5px' }}>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}

            {editingId === todo.id && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <p>{todo.id}.</p>
                <Input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}

            <Button className="button" onClick={() => deleteTodo(todo.id)}>
              삭제하기
            </Button>

            {editingId === todo.id ? (
              <Button className="button" onClick={() => updateTodo(editingId, editingText)}>
                수정 완료
              </Button>
            ) : (
              <Button className="button" onClick={() => setEditingId(todo.id)}>
                수정 진행
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
