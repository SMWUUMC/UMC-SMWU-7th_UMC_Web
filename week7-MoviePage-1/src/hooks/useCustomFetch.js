import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/axios-instance";

// const { data, isLoading, isError } = useCustomFetch('url');
// 데이터와 로딩/에러 상태를 반환하는 커스텀훅!

export const useCustomFetch = () => {
    const getMovies = async (url) => {
        try {
            const response = await axiosInstance.get(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        } 
    }

    return { getMovies };
}