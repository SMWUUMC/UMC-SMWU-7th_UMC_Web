import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [
  {
    id: 1,
    title: '제목',
    content: '내용',
    checked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 전체 Todo 가져오기
app.get('/todo', (req, res) => {
  res.status(200).json(todos);
});

// 특정 Todo 가져오기
app.get('/todo/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});

// 새로운 Todo 생성
app.post('/todo', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'error' });
  }
  const newTodo = {
    id: Date.now(),
    title,
    content,
    checked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.status(200).json(newTodo);
});

// 특정 Todo 수정
app.patch('/todo/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, checked } = req.body;

  const index = todos.findIndex((todo) => todo.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo is not found' });
  }

  const updatedTodo = {
    ...todos[index],
    ...(title && { title }),
    ...(content && { content }),
    ...(checked !== undefined && { checked }),
    updatedAt: new Date().toISOString(),
  };

  todos[index] = updatedTodo;
  res.status(200).json(updatedTodo);
});

// 특정 Todo 삭제
app.delete('/todo/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter((todo) => todo.id !== Number(id));

  if (todos.length < initialLength) {
    res.status(200).json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ error: 'not found' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
