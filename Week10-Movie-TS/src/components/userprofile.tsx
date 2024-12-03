import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios-instance';
import styled from 'styled-components';

// 유저 정보 타입 정의
interface User {
  id: number;
  email: string;
}

// 스타일 정의
const Container = styled.div`
  padding: 20px;
  color: white;
`;

const Message = styled.p`
  font-size: 18px;
  color: white;
`;

// API 호출 함수
const fetchUserInfo = async (): Promise<User> => {
  const response = await axiosInstance.get<User>('/user/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 토큰을 로컬스토리지에서 가져오기
    },
  });
  return response.data;
};

// UserProfile 컴포넌트
const UserProfile: React.FC = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>({
    queryKey: ['user-info'],
    queryFn: fetchUserInfo,
  });

  if (isLoading) {
    return <Message>로딩 중...</Message>;
  }

  if (isError) {
    return <Message>오류가 발생했습니다: {error.message}</Message>;
  }

  return (
    <Container>
      <h1>유저 정보</h1>
      <p>ID: {user?.id}</p>
      <p>이메일: {user?.email}</p>
    </Container>
  );
};

export default UserProfile;