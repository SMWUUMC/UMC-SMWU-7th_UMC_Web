import axiosInstance from "../axios/axiosInstance"
import { useState } from "react"

export const useCustomFetch = () => {

    const [isLoading, setIsLoading] = useState(false)

    const getToDos = async () => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get('/todo')
            return response.data
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getToDoById = async (id) => {
        try {
            const response = await axiosInstance.get(`/todo/${id}`)
            console.log(response)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const postToDo = async (toDo) => {
        try {
            const response = await axiosInstance.post('/todo', toDo)
            console.log(response)
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

    return {isLoading, getToDos, getToDoById, postToDo, patchToDo, deleteToDo}
}