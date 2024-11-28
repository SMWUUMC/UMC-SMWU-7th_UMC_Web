import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext'

const useCustomGet = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const {toDo} = useContext(ToDoContext);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(url)
                console.log('get response')
                console.log(response)
                setData(response)
            } catch (error) {
                console.log('에러에러')
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url, toDo])

    return {data, isLoading, isError}
}

export default useCustomGet;