import { useEffect, useState } from "react";
import axiosInstance from "../api/axios-instance";

interface FetchState<T> {
  data: T | null;        // 데이터를 제네릭 타입으로 처리
  isLoading: boolean;    // 로딩 상태
  isError: boolean;      // 에러 상태
}

// const { data, isLoading, isError } = useCustomFetch<T>('url');
const useCustomFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null); // 제네릭 타입 T 적용
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false); // 이전 에러 상태 초기화
      try {
        const response = await axiosInstance.get<T>(url); // T로 타입 정의
        setData(response.data);
      } catch (error) {
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