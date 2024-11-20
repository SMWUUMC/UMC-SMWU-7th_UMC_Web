import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: true,// React 앱 주소
    credentials: true, // 인증 정보 포함 여부
}));

app.use(express.json());

// GET 요청 처리
app.get('/', (req, res) => {
    res.send('서버에 정상적으로 접속되었습니다!');
});

app.post('/', (req, res) => {
    const { name } = req.body; // 요청 본문에서 `name` 추출
    if (!name) {
        return res.status(400).json({ message: '이름을 입력해주세요.' });
    }
    res.status(200).json({ message: `Hello, ${name}!` });
});


app.post('/auth/register', (req, res) => {
    console.log('회원가입 요청 데이터:', req.body);
    const { email, password, passwordCheck } = req.body;
    
    // 이메일, 비밀번호 검증
    if (!email || !password || password !== passwordCheck) {
        return res.status(400).json({ message: '회원가입 실패: 입력값이 잘못되었습니다.' });
    }

    // 회원가입 성공
    return res.status(200).json({ message: '회원가입 성공' });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // 이메일과 비밀번호 확인
    if (email && password) {
        return res.status(200).json();
    }
    
    return res.status(401).json({ message: "로그인 실패" });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
