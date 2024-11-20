import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 간단한 데이터베이스 대체
let todos = [
  {
    id: 1,
    title: '첫 번째 할 일',
    content: '할 일의 내용을 여기에 작성하세요.',
    checked: false,
  },
];

// 전체 ToDo 가져오기
app.get('/todo', (req, res) => {
  res.status(200).json(todos);
});

// 특정 ToDo 가져오기 (ID 조회)
app.get('/todo/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});

// 새로운 ToDo 생성
app.post('/todo', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const newTodo = {
    id: Date.now(),
    title,
    content,
    checked: false,
  };
  todos.push(newTodo);
  res.status(200).json(newTodo);
});

// 특정 ToDo 수정
app.patch('/todo/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, checked } = req.body;

  const index = todos.findIndex((todo) => todo.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: 'ToDo not found' });
  }

  const updatedTodo = {
    ...todos[index],
    ...(title && { title }),
    ...(content && { content }),
    ...(checked !== undefined && { checked }),
  };

  todos[index] = updatedTodo;
  res.status(200).json(updatedTodo);
});

// 특정 ToDo 삭제
app.delete('/todo/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter((todo) => todo.id !== Number(id));

  if (todos.length < initialLength) {
    res.status(200).json({ message: 'ToDo deleted successfully' });
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});