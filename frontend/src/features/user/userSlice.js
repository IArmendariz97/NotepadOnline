import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, thunkAPI) => {
    try {
      return await userService.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    return await userService.register(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const clearUser = createAction("clearUser");

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Logging in user";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Email Incorrect";
        state.user = null;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating user";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })

      // ACTIONS

      .addCase(clearUser, (state) => {
        state.message = "";
        state.user = {};
      });
  },
});
