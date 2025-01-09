import styled from "styled-components";
import * as yup from 'yup';
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const { handleLogin } = useContext(AuthContext);
    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자에서 16자 사이입니다.').max(16, '비밀번호는 8자에서 16자 사이입니다.').required('비밀번호를 입력해주세요.')
    })

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email: data.email,
                password: data.password,
            }).then((res) => {
                localStorage.setItem('access-token', res.data.accessToken);
                localStorage.setItem('refresh-token', res.data.refreshToken);
                handleLogin(res.data.accessToken, res.data.refreshToken);
            });
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('로그인 실패: ' + error.response.data.message);
        }
    }
    
    return (
        <>
            <LoginSection>
                <Title>로그인</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input type={'email'} {...register('email')}/>
                    <ErrorText style={{color: 'red'}}>{errors.email?.message}</ErrorText>
                    <Input type={'password'} {...register('password')} autoComplete="off"/>
                    <ErrorText style={{color: 'red'}}>{errors.password?.message}</ErrorText>
                    <LoginButton type={'submit'} disabled={!isValid}/>
                </Form>
            </LoginSection>
        </>
    );
}

const Title = styled.h1`
    text-align: center;
    margin-bottom: 3rem;
`

const LoginSection = styled.section`
    display: flex;
    width: 20rem;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
`

const Form = styled.form`
    display: flex;
    width: 20rem;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
`

const Input = styled.input`
    box-sizing: border-box;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid gray;
    margin: 0.4rem;
`

const LoginButton = styled.input`
    box-sizing: border-box;
    height: 3rem;
    border: 0;
    border-radius: 0.5rem;
    margin: 0.4rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: ${props => props.disabled? 'gray' : '#FF0558'};
    cursor: pointer;
    transition: all 0.5s;

    &:hover{
        background: ${props => props.disabled? 'gray' : 'rgba(255, 5, 88,0.8)'};
    }
`

const ErrorText = styled.p`
    box-sizing: border-box;
    margin: 0 0.4rem;
    padding: 0;
    height: fit-content;
    font-size: 0.8rem;
`

export default LoginPage