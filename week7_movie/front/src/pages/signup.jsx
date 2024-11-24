import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import "./signup.css";
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string()
        .email('올바른 형식의 이메일을 입력해주세요.')
        .required('이메일을 반드시 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required(),
        passwordCheck: yup.string().oneOf([yup.ref('password'), null],'비밀번호가 일치하지 않습니다.').required(),
    })

    const {register, handleSubmit, formState: {errors,isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('회원가입 성공:', result);
                alert("회원가입에 성공했습니다.");
                const accessToken = result.accessToken;
                const refreshToken = result.refreshToken;
            
                console.log('Access Token:', accessToken);
                console.log('Refresh Token:', refreshToken);
                navigate('/login');
            } else {
                console.error('회원가입 실패:', response.status);
                alert("이미 가입된 계정입니다.");
            }
        } catch (error) {
            console.error('요청 중 오류 발생:', error);
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup">회원가입</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input className="inputBox" type={'text'} {...register("email")} placeholder='이메일을 입력해주세요'/>
              <p style={{color: 'red'}}>{errors.email?.message}</p>
              <input className="inputBox" type={'password'} {...register("password")} placeholder='비밀번호를 입력해주세요'/>
              <p style={{color: 'red'}}>{errors.password?.message}</p>
              <input className="inputBox" type={'password'} {...register("passwordCheck")} placeholder='비밀번호를 다시 입력해주세요'/>
              <p style={{color: 'red'}}>{errors.passwordCheck?.message}</p>
              <button className="submitBtn" type={'submit'} disabled={!isValid}>회원가입</button>
           </form>
        </div>
    );
};

export default SignUpPage;