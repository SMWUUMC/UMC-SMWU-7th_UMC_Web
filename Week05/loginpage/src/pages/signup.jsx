// SignUpPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './signup.css';

const SignUpPage = () => {
  const [isTouched, setIsTouched] = useState({ email: false, password: false, passwordCheck: false });

  // 유효성 검사 스키마 정의
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('유효한 이메일 형식이 아닙니다.')
      .required('이메일은 필수 입력 요소입니다.'),
    password: yup
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 16자 이하여야 합니다.')
      .required('비밀번호를 입력해주세요.'),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 검증 또한 필수 입력요소입니다.'),
  });

  // react-hook-form과 yupResolver를 사용하여 폼 상태 관리
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // 입력 필드에서 벗어날 때 유효성 검사
  });

  const onSubmit = (data) => {
    console.log('회원가입 데이터:', data);
  };

  // 입력 필드가 포커스될 때 유효성 검사를 시작
  const handleFocus = (field) => {
    setIsTouched((prev) => ({ ...prev, [field]: true }));
    trigger(field); // 특정 필드 유효성 검사 트리거
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          onFocus={() => handleFocus("email")}
          className="signup-input"
        />
        {isTouched.email && errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          onFocus={() => handleFocus("password")}
          className="signup-input"
        />
        {isTouched.password && errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          {...register("passwordCheck")}
          onFocus={() => handleFocus("passwordCheck")}
          className="signup-input"
        />
        {isTouched.passwordCheck && errors.passwordCheck && (
          <p className="error-message">{errors.passwordCheck.message}</p>
        )}

        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;