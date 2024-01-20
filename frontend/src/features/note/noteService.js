// noteService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001/backend/notes";

const noteServices = {
  create: async (data) => {
    try {
      const response = await axios.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  get: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  delete: async (noteId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${noteId}`);
      return { message: response.data.message, noteId };
    } catch (error) {
      throw error.response.data;
    }
  },

  update: async (noteId, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/${noteId}`, data);
      return { message: response.data.message, note: response.data.note };
    } catch (error) {
      throw error.response.data;
    }
  },

  archive: async (noteId) => {
    try {
      const response = await axios.put(`${BASE_URL}/archive/${noteId}`);
      return { message: response.data.message, noteId };
    } catch (error) {
      throw error.response.data;
    }
  },

  unarchive: async (noteId) => {
    try {
      const response = await axios.put(`${BASE_URL}/unarchive/${noteId}`);
      return { message: response.data.message, noteId };
    } catch (error) {
      throw error.response.data;
    }
  },

  getArchived: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/archives`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const noteService = {
  ...noteServices,
};
