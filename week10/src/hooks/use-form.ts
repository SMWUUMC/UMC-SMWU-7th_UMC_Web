import { useState } from "react";

// useForm 커스텀 훅의 Props 타입 정의
interface UseFormProps<T> {
    initialValue: T;
}

// useForm 커스텀 훅
function useForm<T extends Record<string, any>>({ initialValue }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValue);
    const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
    const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

    // 입력값 변경 핸들러
    const handleChangeInput = (name: keyof T, value: any) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    // 포커스 해제 핸들러
    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    // 텍스트 입력 필드에 필요한 속성 반환
    const getTextInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(name, event.target.value);
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    return { values, errors, touched, getTextInputProps };
}

export default useForm;
