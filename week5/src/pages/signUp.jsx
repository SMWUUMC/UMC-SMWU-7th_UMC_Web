import React from 'react'; // eslint-disable-line no-unused-vars
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


const SignupPage = () => {
    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 형식을 입력하세요.').required('이메일을 반드시 입력하세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 반드시 입력하세요.'),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출')
        console.log(data);
    }

    return (
        <SignupForm onSubmit={handleSubmit(onSubmit)}>
            <Input type={'email'} {...register("email")}/>
            <P>{errors.email?.message}</P>
            <Input type={'password'} {...register("password")}/>
            <P style={{color: 'red'}}>{errors.password?.message}</P>
            <SubmitButton type={'submit'}/>
        </SignupForm>
    );
};

export default SignupPage;

const SignupForm = styled.form`
    margin: 200px 0 0 500px;
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Input = styled.input`
    margin: 13px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled(Input)`
    background-color: #f82f63;
    color: white;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: grey;
    }
`;

const P=styled.p`
    margin: 3px 0;
    color: red;
`;