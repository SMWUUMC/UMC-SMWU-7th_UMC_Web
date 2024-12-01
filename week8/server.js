// server.js
import express from 'express';
const app = express();

app.use(express.json());

let todos = [
    { id: 1, title: '고구마 아이스크림 구매하기', content: '근데 어디서 팔까요?', checked: false },
    { id: 2, title: 'TodoTest123123', content: '내용123123123123123', checked: false },
];

// 모든 Todo 조회
app.get('/todo', (req, res) => {
    const { title } = req.query;
    if (title) {
        const filteredTodos = todos.filter(todo => todo.title.includes(title));
        return res.json(filteredTodos);
    }
    res.json(todos);
});

// Todo 추가
app.post('/todo', (req, res) => {
    const { title, content } = req.body;
    const newTodo = { id: todos.length + 1, title, content, checked: false };
    todos.push(newTodo);
    res.status(200).json(newTodo);
});

// 특정 Todo 조회
app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Todo 수정
app.patch('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, checked } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) return res.status(404).send('Todo not found');
    if (title) todo.title = title;
    if (content) todo.content = content;
    if (checked !== undefined) todo.checked = checked;
    res.status(200).json(todo);
});

// Todo 삭제
app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(200).send(`Deleted Todo with ID ${id}`);
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중입니다.');
})


