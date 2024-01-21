import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "./categoryService";

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// I LEAVE THIS HERE IN CASE I NEED TO DO A VIEW TO ADD OR DELETE CATEGORIES, MEANWHILE I CAN DO IT MANUALLY

export const createCategory = createAsyncThunk(
  "createCategory",
  async (data, thunkAPI) => {
    try {
      return await categoryService.create(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.get();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (categoryId, thunkAPI) => {
    try {
      return await categoryService.delete(categoryId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE CATEGORY
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating category";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.categories = action.payload.categories;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Error creating category";
      })

      // GET CATEGORIES
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting categories";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.categories = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Error getting categories";
      })

      // DELETE CATEGORY
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.message = "Deleting category";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.categories = action.payload.categories;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Error deleting category";
      });
  },
});
