import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BASE_URL = `${backendUrl}/users`;

const login = async (user) => {
  const response = await axios.post(`${BASE_URL}/login`, user);

  return response.data;
};

const register = async (data) => {
  const response = await axios.post(`${BASE_URL}`, data);
  return response.data;
};

export const userService = {
  login,
  register,
};
