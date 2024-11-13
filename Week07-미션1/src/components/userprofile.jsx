import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios-instance';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  color: white;
`;

const Message = styled.p`
  font-size: 18px;
  color: white;
`;

const fetchUserInfo = () => {
  return axiosInstance.get('/user/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 토큰을 로컬스토리지에서 가져오기
    },
  }).then((res) => res.data);
};

const UserProfile = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
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
      <p>ID: {user.id}</p>
      <p>이메일: {user.email}</p>
    </Container>
  );
};

export default UserProfile;