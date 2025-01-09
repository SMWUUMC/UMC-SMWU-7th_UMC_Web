import { useEffect, useState } from "react";

// 로그인 뿐 아니라 다양한 form에서 사용할 수 있도록 만든 커스텀훅
function useForm({initialValue, validate}) {
    const [values, setValues] = useState(initialValue); // 여기에 중괄호를 썼었다가 사단이 났다... login.jsx에서 login.values.어쩌고로 접근하고 있으므로 중괄호를 쓰면 안 되는 것이었나보다... 아 슬퍼
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleChangeInput = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleBlur = (name) => {
        setTouched({
            ...touched,
            [name]: true
        })
    }

    const getTextInputProps = (name) => {
        const value = values[name]; // name(email, password 등...)에 해당하는 값에 접근
        const onChange = (event) => handleChangeInput(name, event.target.value);
        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    }

    useEffect(() => {
        const newErrors = validate(values);
        console.log(newErrors);
        setErrors(newErrors);
    }, [validate, values])

    return {values, errors, touched, getTextInputProps};
}

export default useForm;