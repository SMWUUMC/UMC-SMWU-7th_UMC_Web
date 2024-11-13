import {useForm} from 'react-hook-form'

const SignUpPage = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log('폼 데이터 제출')
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type={'email'} {...register("email")}/>
            <input type={'password'} {...register("password")}/>
            <input type={'submit'}/>
        </form>
    );
};

export default SignUpPage;