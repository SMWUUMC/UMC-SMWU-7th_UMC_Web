import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext'

const useCustomDelete = (url) => {
    // const [data, setData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState(false);

    const { setToDo } = useContext(ToDoContext);
    
    console.log('딜리트 내부')
    console.log(url);

    const deleteToDo = async (url) => {
        // setIsLoading(true)
        try {
            const response = await axios.delete(url)
            console.log(response)
            // setData(response)
        } catch (error) {
            // setIsError(true)
        } finally {
            // setIsLoading(false)
            // get을 재호출하여 삭제된 데이터를 반영하기 위해 ToDo를 초기화
            setToDo({
                title: '',
                content: ''
            })
        }
    }

    return deleteToDo
}

export default useCustomDelete;