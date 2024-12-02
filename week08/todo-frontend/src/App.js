import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  // GET: To-Do 목록 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:3000/todo")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // POST: 새로운 To-Do 추가
  const addTodo = () => {
    if (!newTitle || !newContent) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    axios
      .post("http://localhost:3000/todo", {
        title: newTitle,
        content: newContent,
        checked: false,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTitle("");
        setNewContent("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // 체크박스 상태 변경
  const checkTodo = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    axios
      .patch(`http://localhost:3000/todo/${id}`, {
        checked: !todoToUpdate.checked, // 현재 상태의 반대로 변경
      })
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
          )
        );
      })
      .catch((error) => console.error("Error checking todo:", error));
  };

  // PUT: To-Do 수정
  // 수정 버튼 클릭 시, 수정할 todo 항목을 선택하고 상태 설정
  const editTodo = (id, title, content) => {
    setEditingTodoId(id);
    setEditingTitle(title);
    setEditingContent(content);
  };

  // 수정 완료 버튼 클릭 시, todo 항목 업데이트
  const saveEdit = () => {
    if (!editingTitle || !editingContent) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    axios
      .patch(`http://localhost:3000/todo/${editingTodoId}`, {
        title: editingTitle,
        content: editingContent,
      })
      .then((response) => {
        // 수정된 데이터를 todos 배열에 반영
        setTodos(
          todos.map((todo) =>
            todo.id === editingTodoId
              ? { ...todo, title: editingTitle, content: editingContent }
              : todo
          )
        );
        setEditingTodoId(null); // 수정 완료 후, 편집 모드 해제
        setEditingTitle(""); // 제목 필드 초기화
        setEditingContent(""); // 내용 필드 초기화
      })
      .catch((error) => {
        console.error("Error saving todo edit:", error);
      });
  };

  // DELETE: To-Do 삭제
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/todo/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div>
      <h1>🍀UMC ToDoList🍀</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
      />
      <br></br>
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="내용을 입력해주세요"
      />
      <button onClick={addTodo}>ToDo 생성</button>

      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} style={{ listStyle: "none" }}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => checkTodo(todo.id)} // 체크박스 클릭 시 상태 변경
              />
              {/* 수정 중인 Todo는 수정 입력 필드를 보여줌 */}
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)} // 수정 중인 제목
                  />
                  <input
                    type="text"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)} // 수정 중인 내용
                  />
                  <button onClick={saveEdit}>수정 완료</button>
                </>
              ) : (
                <>
                  {todo.title} - {todo.content}
                  <button
                    onClick={() => editTodo(todo.id, todo.title, todo.content)}
                  >
                    수정
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>등록된 ToDo가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default App;
