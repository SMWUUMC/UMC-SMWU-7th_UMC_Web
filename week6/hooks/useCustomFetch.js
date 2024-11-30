import { useEffect, useState } from "react";
import axiosInstance from "../src/apis/axios-instance";

const useCustomFetch = (url) => {
    const [data, setData] = useState(null); // 초기값을 null로 설정
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false); // URL 변경 시 에러 상태 초기화
            try {
                const response = await axiosInstance.get(url);
                setData(response.data); // 필요한 데이터만 저장
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (url) fetchData(); // URL이 존재하는 경우에만 요청
    }, [url]);

    return { data, isLoading, isError };
};

export default useCustomFetch;
