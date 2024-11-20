import axiosInstance from '../api/axios-instance';

export const useCustomFetch = () => {
  
  // 전체 ToDo 가져오기
  const getTodos = async (searchQuery = '') => {
    try {
      const response = await axiosInstance.get('/todo', {
        params: { title: searchQuery }, // Query Parameter 사용
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // 상세 정보 가져오기
  const getTodoById = async (id) => {
    try {
      const response = await axiosInstance.get(`/todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ToDo 생성
  const createTodo = async (todo) => {
    try {
      const response = await axiosInstance.post('/todo', todo);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ToDo 수정
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axiosInstance.patch(`/todo/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ToDo 삭제
  const deleteTodo = async (id) => {
    try {
      const response = await axiosInstance.delete(`/todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
};
