import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, email: 'dydals34403@gmail.com', password: 'hihi' },
];

// 회원가입
app.post('/auth/register', (req, res) => {
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

  // 로그인 성공 시 토큰 발급
  return res.status(200).json({
    refreshToken: "eyJhbGci123OiJIUzI1NiIsInR41235cCI6IkpXVCJ9.e123yJzdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3Mjc2MTM3MjgsImV4cCI6MTcyNzcwMDEyOH0.Ag8Va6NtNhcphunV8bIdFSXifogXEtRD-SzEOrYW0kQ",
    accessToken: "eyJhbGciOiJI123UzI1NiIsInR5123123cCI6IkpXVCJ9.eyJ123zdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyNzYxMzcyOCwiZXhwIjoxNzI3NjE0MDI4fQ.zSCImG4svIfB_zbAkx8nCAMhy1ReEb4019krPu2cEq4"
  });
});

// 유저 정보 불러오기
app.get('/user/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    // 토큰 검증 로직 (여기서는 간단히 토큰이 존재하는지만 확인)
    if (token === "eyJhbGciOiJI123UzI1NiIsInR5123123cCI6IkpXVCJ9.eyJ123zdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyNzYxMzcyOCwiZXhwIjoxNzI3NjE0MDI4fQ.zSCImG4svIfB_zbAkx8nCAMhy1ReEb4019krPu2cEq4") { // 실제로는 JWT 검증을 해야 함
      return res.status(200).json(users[0]); // 예제 응답
    }
  }
  return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});