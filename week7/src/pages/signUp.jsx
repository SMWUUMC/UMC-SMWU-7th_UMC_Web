import React from 'react'; // eslint-disable-line no-unused-vars
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!')
            .required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8~16자 사이로 입력하세요!')
            .max(16, '비밀번호는 8~16자 사이로 입력하세요!')
            .required('비밀번호를 입력해주세요.'),
        passwordCheck: yup
            .string()
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호 확인을 입력해주세요.'),
    });

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    // 회원가입 제출
    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:3000/auth/register', {
                email: data.email,
                password: data.password,
                passwordCheck: data.passwordCheck,
            }, {
            withCredentials: true, // 쿠키와 같은 인증 정보를 전송
            })
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
            console.log(data);
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert(error.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <SignupForm onSubmit={handleSubmit(onSubmit)}>
            <Text>회원가입</Text>
            <Input
                type="email"
                placeholder="이메일을 입력해주세요!"
                {...register('email')}
                onBlur={() => trigger('email')}
            />
            <P>{errors.email?.message}</P>

            <Input
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                {...register('password')}
                onBlur={() => trigger('password')}
            />
            <P>{errors.password?.message}</P>

            <Input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요!"
                {...register('passwordCheck')}
                onBlur={() => trigger('passwordCheck')}
            />
            <P>{errors.passwordCheck?.message}</P>

            <SignupButton type="submit" disabled={!isValid}>
                회원가입
            </SignupButton>
        </SignupForm>
    );
};

export default SignupPage;

const SignupForm = styled.form`
    margin: 140px 0 0 500px;
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Text = styled.p`
    color: white;
    margin: 10px auto;
    font-size: 25px;
    font-weight: 700;
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

const SignupButton = styled.button`
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
