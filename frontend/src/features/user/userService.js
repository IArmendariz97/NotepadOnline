import axios from "axios";

const login = async (user) => {
  const response = await axios.post(
    `http://localhost:3001/backend/users/login`,
    user
  );

  return response.data;
};

const register = async (data) => {
  const response = await axios.post(
    `http://localhost:3001/backend/users`,
    data
  );
  return response.data;
};

export const userService = {
  login,
  register,
};
