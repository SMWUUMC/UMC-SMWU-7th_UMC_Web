// LoginPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './login.css';

const LoginPage = () => {
  const [isTouched, setIsTouched] = useState({ email: false, password: false });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!')
      .required('이메일을 입력해주세요.'),
    password: yup
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 16자 이하여야 합니다.')
      .required('비밀번호를 입력해주세요.'),
  });

  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // 실시간으로 유효성 검사
  });

  const onSubmit = (data) => {
    console.log('로그인 성공:', data);
  };

  const handleFocus = (field) => {
    setIsTouched((prev) => ({ ...prev, [field]: true }));
    trigger(field); // 필드 유효성 검사 트리거
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          onFocus={() => handleFocus("email")}
          className="login-input"
        />
        {isTouched.email && errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          onFocus={() => handleFocus("password")}
          className="login-input"
        />
          {isTouched.password && errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <button type="submit" className="login-button">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;