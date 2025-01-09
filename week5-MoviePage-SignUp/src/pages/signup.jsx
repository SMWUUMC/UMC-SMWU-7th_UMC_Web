import styled from "styled-components";
import * as yup from 'yup';
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'

const SignupPage = () => {
    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자에서 16자 사이입니다.').max(16, '비밀번호는 8자에서 16자 사이입니다.').required('비밀번호를 입력해주세요.'),
        passwordVerification: yup.string().oneOf([yup.ref('password'), null],
        '비밀번호가 일치하지 않습니다.')
    })

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data) => {
        console.log('회원가입');
        console.log(data);
    }
    
    return (
        <>
            <LoginSection>
                <Title>회원가입</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label>아이디</Label>
                    <Input type={'email'} {...register('email')}/>
                    <ErrorText style={{color: 'red'}}>{errors.email?.message}</ErrorText>
                    <Label>비밀번호</Label>
                    <Input type={'password'} {...register('password')} autoComplete="off"/>
                    <ErrorText style={{color: 'red'}}>{errors.password?.message}</ErrorText>
                    <Label>비밀번호 확인</Label>
                    <Input type={'password'} {...register('passwordVerification')} autoComplete="off"/>
                    <ErrorText style={{color: 'red'}}>{errors.passwordVerification?.message}</ErrorText>
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

const Label = styled.p`
    box-sizing: border-box;
    margin: 0 0.4rem;
    padding: 0;
    height: fit-content;
    font-size: 0.8rem;
`

export default SignupPage