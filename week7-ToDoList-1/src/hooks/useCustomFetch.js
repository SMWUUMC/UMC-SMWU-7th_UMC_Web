import axiosInstance from "../axios/axiosInstance"

export const useCustomFetch = () => {

    const getToDos = async () => {
        try {
            const response = await axiosInstance.get('/todo')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const getToDoById = async (id) => {
        try {
            const response = await axiosInstance.get(`/todo/${id}`)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const postToDo = async (toDo) => {
        try {
            const response = await axiosInstance.post('/todo', toDo)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const patchToDo = async (toDo) => {
        try {
            const response = await axiosInstance.patch(`/todo/${toDo.id}`, toDo)
            console.log(response)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteToDo = async (toDo) => {
        try {
            const response = await axiosInstance.delete(`/todo/${toDo.id}`)
            console.log(response)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    return {getToDos, getToDoById, postToDo, patchToDo, deleteToDo}
}