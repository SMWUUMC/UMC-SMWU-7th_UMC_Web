import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useUser } from '../context/NicknameProvider';

const LogInPage = () => {
  const {login} = useAuth();
  const {setNickname} = useUser();
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string()
        .email('올바른 형식의 이메일을 입력해주세요.')
        .required('이메일을 반드시 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required(),
    })

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        try {
          const response = await axios.post('http://localhost:3000/auth/login', {
            email: data.email,
            password: data.password,
          });
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
    
          console.log('access:', accessToken);
          console.log('refresh:',refreshToken);

          const userResponse = await axios.get('http://localhost:3000/user/me',{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userEmail = userResponse.data.email;
          console.log('이메일:',userResponse.data.email);

          const userNickname = userEmail.split('@')[0];
          setNickname(userNickname);

          alert("로그인에 성공했습니다.");
          login();
          navigate('/');
        } catch (error) {
          console.error("로그인 오류:", error);
          alert("로그인에 실패했습니다.");
        }
      };


    return (
        <div className="signup-container">
            <h1 className="signup">로그인</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input className="inputBox" type={'text'} {...register("email")} placeholder='이메일을 입력해주세요'/>
              <p style={{color: 'red'}}>{errors.email?.message}</p>
              <input className="inputBox" type={'password'} {...register("password")} 
              placeholder='비밀번호를 입력해주세요'
              />
              <p style={{color: 'red'}}>{errors.password?.message}</p>
              <button className="submitBtn" type={'submit'} disabled={!isValid}>로그인</button>
           </form>
        </div>
    );
};

export default LogInPage;