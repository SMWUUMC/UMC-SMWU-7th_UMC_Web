import axiosInstance from '../api/axios-instance';

export const useCustomFetch = () => {
  // 전체 ToDo 가져오기
  const getTodos = async () => {
    try {
      const response = await axiosInstance.get('/todo');
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  };
  // 상세 정보 가져오기
  const getTodoById = async (id) => {
    const response = await axiosInstance.get(`/todo/${id}`);
    return response.data;
  };

  // ToDo 생성
  const createTodo = async (todo) => {
    try {
      const response = await axiosInstance.post('/todo', todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  };

  // ToDo 수정
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axiosInstance.patch(`/todo/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  // ToDo 삭제
  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  return { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
};