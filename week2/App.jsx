import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const [text, setText] = useState('');

  const [editingId, setEditingId] = useState(''); // 수정 중일 때는 input이 나오게, 수정 안하고 있을 때는 input이 안나오게
  const [editingText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 1. 추가하기
  const addTodo = () => {
    if (text.trim().length === 0) {
      alert('제대로 입력해라!');
      return;
    }
    setTodos((prev) => [//여기서 prev는 이전 상태의 값을 기억해서 가져옴. setCount보다 여기서 더 적합한듯
      ...prev,//얕은 복사
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  // 2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 3. 수정하기
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId(''); // 수정 완료 후 수정 상태 초기화
  };

  return (
    <>
      <form className="todoForm" onSubmit={handleSubmit}>
        <input className="textbox"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="todo" onClick={addTodo} type="submit">
          할 일 등록
        </button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} style={{ display: 'flex', gap: '5px' }}>
            {/* 수정이 아닐 때 */}
            {editingId !== todo.id && (
              <div key={todo.id} style={{ color: 'white', display: 'flex', gap: '5px' }}>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}

            {/* 수정 중 상태일 때 */}
            {editingId === todo.id && (
              <div key={todo.id} style={{ display: 'flex', gap: '5px' }}>
                <p>{todo.id}.</p>
                <input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <button className="button" onClick={() => deleteTodo(todo.id)}>삭제하기</button>

            {/* 수정 중인 상태 */}
            {editingId === todo.id ? (
              <button className="button" onClick={() => updateTodo(editingId, editingText)}>
                수정 완료
              </button>
            ) : (
              <button className="button" onClick={() => setEditingId(todo.id)}>수정 진행</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
