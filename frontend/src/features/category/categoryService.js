import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BASE_URL = `${backendUrl}/categories`;

const categoryServices = {
  create: async (data) => {
    try {
      const response = await axios.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  get: async () => {
    try {
      const response = await axios.get(BASE_URL);

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  delete: async (categoryId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${categoryId}`);
      return { message: response.data.message, categoryId };
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const categoryService = {
  ...categoryServices,
};
