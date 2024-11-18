import React from 'react'; // eslint-disable-line no-unused-vars
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginPage = () => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!')
            .required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8~16자 사이로 입력하세요!')
            .max(16, '비밀번호는 8~16자 사이로 입력하세요!')
            .required('비밀번호는 8자 이상이어야 합니다.'),
    });

    const {
        register, handleSubmit, trigger, formState: { errors, isValid },} = useForm({
        resolver: yupResolver(schema), mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출');
        console.log(data);
    };

    return (
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <Text>로그인</Text>
            <Input
                type="email"
                placeholder="이메일을 입력해주세요!"
                {...register("email")}
                onBlur={() => trigger("email")}
            />
            <P>{errors.email?.message}</P>
            <Input
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                {...register("password")}
                onBlur={() => trigger("password")}
            />
            <P>{errors.password?.message}</P>
            <LoginButton type="submit" disabled={!isValid}>로그인</LoginButton>
        </LoginForm>
    );
};

export default LoginPage;


const LoginForm = styled.form`
    margin: 160px 0 0 500px;
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Text=styled.p`
    color: white;
    margin: 10px auto;
    font-size: 25px;
    font-weight:700;
`;

const Input = styled.input`
    margin: 13px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:focus {
        outline: none;
        border-color: #f82f63;
    }
`;

const LoginButton = styled.button`
    margin: 13px 0;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#f82f63')};
    color: ${({ disabled }) => (disabled ? '#666' : 'white')};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#ccc' : 'grey')};
    }
`;

const P = styled.p`
    margin: 3px 0;
    color: red;
    font-size: 12px;
`;
