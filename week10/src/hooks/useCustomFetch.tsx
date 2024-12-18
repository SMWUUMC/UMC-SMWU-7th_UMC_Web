import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios-instance";

// useCustomFetch 훅의 반환값 타입 정의
interface UseCustomFetchResult<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
}

// useCustomFetch 훅
const useCustomFetch = <T>(url: string | null): UseCustomFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false); // URL 변경 시 에러 상태 초기화
            try {
                if (!url) return; // URL이 없을 경우 요청 건너뛰기
                const response = await axiosInstance.get<T>(url);
                setData(response.data); // 제네릭 타입 T로 데이터를 저장
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, isError };
};

export default useCustomFetch;
