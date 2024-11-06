import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/auth/register', (req, res) => {
  const { email, password, passwordCheck } = req.body;
  if (email && password && password === passwordCheck) {
    return res.status(201).json({ message: "회원가입 성공" });
  }
  return res.status(400).json({ message: "회원가입 실패" });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    return res.status(200).json({
        "refreshToken" : "eyJhbGci123OiJIUzI1NiIsInR41235cCI6IkpXVCJ9.e123yJzdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3Mjc2MTM3MjgsImV4cCI6MTcyNzcwMDEyOH0.Ag8Va6NtNhcphunV8bIdFSXifogXEtRD-SzEOrYW0kQ",
        "accessToken" : "eyJhbGciOiJI123UzI1NiIsInR5123123cCI6IkpXVCJ9.eyJ123zdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyNzYxMzcyOCwiZXhwIjoxNzI3NjE0MDI4fQ.zSCImG4svIfB_zbAkx8nCAMhy1ReEb4019krPu2cEq4"
        
    });
  }
  return res.status(401).json({ message: "로그인 실패" });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});