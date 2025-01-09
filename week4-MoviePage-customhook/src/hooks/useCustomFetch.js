import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/axios-instance";

// const { data, isLoading, isError } = useCustomFetch('url');
// 데이터와 로딩/에러 상태를 반환하는 커스텀훅!
const useCustomFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // 영화 정보가 담김
                const response = await axiosInstance.get(url);
                setData(response);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]); // url이 변경될 때마다 실행되도록 의존성 배열 설정

    return { data, isLoading, isError };
}

export default useCustomFetch;