import axios from "axios"

const url = "https://66f5fc36436827ced9759ca6.mockapi.io/todo";

export const fetchTodo = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const addTodo = async (newTodo) => {
  const response = await axios.post(url, newTodo)
  return response.data
};

export const updateTodo =  async ({ id, updateTodo }) => {
  const response = await axios.put(`${url}/${id}`, updateTodo)
  return response.data
};