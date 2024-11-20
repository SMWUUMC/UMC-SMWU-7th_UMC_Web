import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

const SECRET_KEY = 'u2315368#';
const REFRESH_SECRET_KEY = 'u2315368#%';

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, email: 'dydals34403@gmail.com', password: 'hihi' },
];

// 회원가입
app.post('/auth/register', (req, res) => {
  console.log('회원가입 요청 데이터:', req.body); // 요청 데이터 출력
  const { email, password, passwordCheck } = req.body;

  // 이메일 중복 확인
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
  }

  // 비밀번호 일치 확인
  if (password !== passwordCheck) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  // 회원가입 성공
  users.push({ id: users.length + 1, email, password });
  return res.status(201).json({ message: "회원가입 성공" });
});

// 로그인
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);

  // 이메일과 비밀번호 검증
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
  }

  // 토큰 생성
  const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '5m' });
  const refreshToken = jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET_KEY, { expiresIn: '24h' });

  return res.status(200).json({ accessToken, refreshToken });
});

// 유저 정보 불러오기
app.get('/user/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    // 토큰 검증
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = users.find(u => u.id === decoded.id);
      if (user) {
        return res.status(200).json(user);
      }
    } catch (error) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
  }
  return res.status(401).json({ message: "토큰이 없습니다." });
});

// 토큰 갱신
app.post('/auth/token/access', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const refreshToken = authHeader.split(' ')[1];

    // Refresh Token 검증
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
      const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, SECRET_KEY, { expiresIn: '5m' });
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(401).json({ message: '유효하지 않은 Refresh Token입니다.' });
    }
  }
  return res.status(401).json({ message: 'Refresh Token이 없습니다.' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});