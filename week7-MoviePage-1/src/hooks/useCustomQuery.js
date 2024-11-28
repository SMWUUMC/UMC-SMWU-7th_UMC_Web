import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios/axios-instance";

const useCustomQuery = async (url) => {
    return await axiosInstance.get(url);
}

const { data, loading, error } = useQuery({
    queryKey: 'movie',
    queryFn: () => useCustomQuery(url)
})

export default {data, loading, error};