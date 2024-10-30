import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css';

const SignUpPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required('이메일을 반드시 입력해주세요.'),
    password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <input type="email" {...register("email")} placeholder="이메일" />
      <p className="error-message">{errors.email?.message}</p>
      <input type="password" {...register("password")} placeholder="비밀번호" />
      <p className="error-message">{errors.password?.message}</p>
      <input type="submit" value="제출" />
    </form>
  );
};

export default SignUpPage;