import './App.css'
import { useState } from 'react';

// Input 컴포넌트
function Input({ value, onChange, className }) {
    return (
        <input 
          type = "text"
          value = {value}
          onChange = {onChange}
          className={className}
        />
    );
}

// Button 컴포넌트
function Button({ onClick, label, className }) {
    return (
        <button onClick = {onClick} className={className}>
            {label}
        </button>
    );
}


function App() {
    const [todos, setTodos] =  useState([
        {id: 1, task: '투두 만들어보기'},
        {id: 2, task: '박유진'},
    ]);

    const [text, setText] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editText, setEditText] = useState('');
 
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const addTodo = () => {
        setTodos((prev) => [
            ...prev,
            {id: Math.floor(Math.random() * 100) + 2, task: text},
        ]);
        setText('');
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) => item.id !== id));
    };

    const updateTodo = (id, text) => {
        setTodos((prev) => 
            prev.map((item) => (item.id === id ? {...item, task: text} : item))
        );
        setEditingId('');
    };

    return (
        <div className="page">
         <h2 className="title">📌UMC Todo List📌</h2>
         <form onSubmit={handleSubmit}>
            <Input 
              className = "add-input"
              value={text} 
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => addTodo()} 
            className = "add-button"
            label="할 일 등록" />
         </form>
         <div>
         {todos.map((todo, index) => (
                    <div className="todo-index" key={index}>
                        <div className="text-area">
                            <p>{todo.id}</p>
                            {editingId !== todo.id ? (
                                <p>{todo.task}</p>
                            ) : (
                                <Input
                                  className= "edit-area"
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                />
                            )}
                        </div>

                        <div className="button-group">
                            {editingId === todo.id ? (
                                <Button onClick={() => updateTodo(editingId, editText)} 
                                className="end-edit"
                                label="완료" />
                            ) : (
                                <Button onClick={() => {
                                    setEditingId(todo.id);
                                    setEditText(todo.task);
                                }} className="delete-edit" label="수정" />
                            )}
                            <Button onClick={() => deleteTodo(todo.id)} 
                            className="delete-edit"
                            label="삭제" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App
