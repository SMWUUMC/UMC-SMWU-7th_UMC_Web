import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../apis/axios-instance";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // schema는 유효성 검사라고 생각하면 됨
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다. 다시 확인해주세요!")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호는 8~16자 사이로 입력해주세요!"),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 검증 또한 필수 입력요소입니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Submitting data:", data); // 여기까지 가능
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/auth/register",
        {
          email: data.email,
          password: data.password,
          passwordCheck: data.passwordCheck,
        }
      );

      // 응답 데이터 로그
      console.log("Response from server:", response.data);

      alert("회원가입 성공");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패: ", error.response?.data || error.message);
      console.error("회원가입 실패 response: ", error.response);

      alert(
        error.response?.data?.message || "회원가입 중 문제가 발생했습니다."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        width: "100vw",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>회원가입</h1>
      <FormInput
        placeholder="이메일을 입력해주세요!"
        type={"email"}
        {...register("email")}
      />
      <ErrorMessage>{errors.email?.message}</ErrorMessage>
      <FormInput
        placeholder="비밀번호를 입력해주세요!"
        type={"password"}
        {...register("password")}
      />
      <ErrorMessage>{errors.password?.message}</ErrorMessage>
      <FormInput
        placeholder="비밀번호를 다시 입력해주세요!"
        type={"password"}
        {...register("passwordCheck")}
      />
      <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
      <SubmitButton
        type={"submit"}
        isValid={isValid} // 폼이 유효하지 않으면 비활성화
      />
    </form>
  );
};

const FormInput = styled.input`
  width: 400px;
  height: 30px;
  margin-top: 10px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 9px;
`;

const SubmitButton = styled.input`
  width: 410px;
  height: 33px;
  color: white;
  background-color: ${(props) => (props.isValid ? "red" : "gray")};
  border: none;
  border-radius: 10px;
  cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 11px;
`;

export default SignUp;
