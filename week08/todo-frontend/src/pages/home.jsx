import styled from "styled-components";
import axiosInstance from "../api/axios-instance";
import { useEffect, useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  // GET: To-Do 목록 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get(`/todo`);
        setTodos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // POST: 새로운 To-Do 추가
  const addTodo = async () => {
    if (!newTitle || !newContent) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/todo`, {
        title: newTitle,
        content: newContent,
        // checked: false,
      });
      setTodos([...todos, response.data]);
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // 체크박스 상태 변경
  const checkTodo = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    axiosInstance
      .patch(`/todo/${id}`, {
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
  const saveEdit = async () => {
    if (!editingTitle || !editingContent) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    try {
      await axiosInstance.patch(`/todo/${editingTodoId}`, {
        title: editingTitle,
        content: editingContent,
      });
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
    } catch (error) {
      console.error("Error saving todo edit:", error);
    }
  };

  // DELETE: To-Do 삭제
  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  //////////////////////////////////////////

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>🍀UMC ToDoList🍀</h1>
      <TodoInputBox>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="내용을 입력해주세요"
        />
        <button onClick={addTodo}>ToDo 생성</button>
      </TodoInputBox>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "3px solid black",
          padding: "10px",
        }}
      >
        <ul style={{ paddingInlineStart: "0" }}>
          {todos.map((todo) => (
            <List key={todo.id}>
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
                  <Button onClick={saveEdit}>수정 완료</Button>
                </>
              ) : (
                <>
                  <div style={{ margin: "0 20px" }}>
                    <TodoTitle>{todo.title}</TodoTitle>
                    <TodoContent>{todo.content}</TodoContent>
                  </div>
                  <Button
                    onClick={() => editTodo(todo.id, todo.title, todo.content)}
                  >
                    수정
                  </Button>
                  <Button onClick={() => deleteTodo(todo.id)}>삭제</Button>
                </>
              )}
            </List>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

const Button = styled.button`
  margin-left: 5px;
  padding: 8px 20px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.li`
  liststyle: none;
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px -6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

const TodoContent = styled.div`
  color: #696969;
  font-size: 15px;
`;

const TodoInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
`;
