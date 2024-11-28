import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext'

const useCustomFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const {toDo, setToDo} = useContext(ToDoContext);

    const {title, content} = toDo;
    
    console.log("useCustomFetch 진입")

    useEffect(() => {
        if (title === '' || content === '') return;
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.post(url, {
                    "title": title,
                    "content": content
                  })
                console.log(response)
            } catch (error) {
                console.log('에러에러')
                setIsError(true)
            } finally {
                setIsLoading(false)
                setToDo({
                    title: '',
                    content: ''
                })
            }
        }
        fetchData()
    }, [url, toDo])
}

export default useCustomFetch;