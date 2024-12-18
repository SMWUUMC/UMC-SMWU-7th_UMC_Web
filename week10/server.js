import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

const JWT_SECRET_KEY = 'your_jwt_secret_key'; // 실제 서비스에서는 환경변수로 관리하는 것이 좋습니다.

// CORS 설정
app.use(cors({
    origin: true, // 클라이언트 도메인
    credentials: true,  // 쿠키를 허용하려면 true로 설정
}));

app.use(express.json());

// 기본 GET 요청
app.get('/', (req, res) => {
    res.send('서버에 정상적으로 접속되었습니다!');
});

// 회원가입 API
app.post('/auth/register', (req, res) => {
    console.log('회원가입 요청 데이터:', req.body);
    const { email, password, passwordCheck } = req.body;
    
    if (!email || !password || password !== passwordCheck) {
        return res.status(400).json({ message: '회원가입 실패: 입력값이 잘못되었습니다.' });
    }

    // // 비밀번호 해싱 (예: bcrypt)
    // const hashedPassword = bcrypt.hashSync(password, 10); // 10은 salt rounds

    // // 비밀번호 해싱 후 저장하는 로직이 필요함 (예: 데이터베이스에 저장)
    // // 예시로 여기서는 해시된 비밀번호만 사용한다고 가정

    return res.status(200).json({ message: '회원가입 성공' });
});

// 로그인 API
//----->>수정 필요
// app.post('/auth/login', (req, res) => {
//     const { email, password } = req.body;

//     // 이메일과 비밀번호 검증 (이 부분은 데이터베이스에서 사용자 정보를 확인하는 로직이어야 함)
//     if (email === 'test@test.com' && password === 'password123') {
//         // 비밀번호가 올바른 경우, JWT 토큰 생성
//         const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '1h' });
//         const refreshToken = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '7d' });

//         return res.status(200).json({ accessToken, refreshToken });
//     }

//     return res.status(401).json({ message: "로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다." });
// });

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
