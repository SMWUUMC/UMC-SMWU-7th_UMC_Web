import styled from "styled-components";
import { validateLogin } from "../utils/validate";
import useForm from "../hooks/useForm";

const LoginPage = () => {
    
    const login = useForm({
        initialValue: {
            email: '',
            password: ''
        },
        validate: validateLogin
    })

    const handleClickLogin = () => {
        console.log(login.values.email, login.values.password)
    }

    return (
        <>
            <LoginSection>
                <Title>로그인</Title>
                    <Input error={login.touched.email && login.errors.email} type={'email'} placeholder={'이메일을 입력해주세요.'} {...login.getTextInputProps('email')}/>
                    {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}
                    <Input error={login.touched.password && login.errors.password} type={'password'} placeholder={'비밀번호를 입력해주세요.'} {...login.getTextInputProps('password')}/>
                    {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}
                    <LoginButton onClick={handleClickLogin}>로그인</LoginButton>
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
    border: ${props => props.error? '4px solid red' : '1px solid #ccc'};
    margin: 0.4rem;
`

const LoginButton = styled.button`
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
    color: red;
    box-sizing: border-box;
    margin: 0 0.4rem;
    padding: 0;
    height: fit-content;
    font-size: 0.8rem;
`

export default LoginPage