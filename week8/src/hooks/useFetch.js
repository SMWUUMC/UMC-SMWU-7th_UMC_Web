import { useState, useEffect } from "react";

export const useFetch = (apiFunc, params) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!params) return;

        const fetchData = async () => {
            try {
                const result = await apiFunc(params);
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [apiFunc, params]);

    return { data, loading, error };
};
