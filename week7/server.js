import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: true,// 모두에 대해 허용-> true?
    credentials: true,
}));

app.use(express.json());


app.get('/', (req, res) => {
    res.send('서버에 정상적으로 접속되었습니다!');
});


app.post('/auth/register', (req, res) => {
    console.log('회원가입 요청 데이터:', req.body);
    const { email, password, passwordCheck } = req.body;
    
    if (!email || !password || password !== passwordCheck) {
        return res.status(400).json({ message: '회원가입 실패: 입력값이 잘못되었습니다.' });
    }

    return res.status(200).json({ message: '회원가입 성공' });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;


    if (email === 'test@test.com' && password === 'password123') {
        const accessToken = 'exampleAccessToken';
        const refreshToken = 'exampleRefreshToken';

        return res.status(200).json({ accessToken, refreshToken });
    }

    return res.status(401).json({ message: "로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다." });
});


app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
