import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import proxy from "../../proxy";

const initialState = {
  apiMsg: null,
};

export const signin = createAsyncThunk("signin", async (data) => {
  const response = await fetch(`${proxy}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const status = await response.status;
  const responseBody = await response.json();
  return { data, responseBody, status };
});

export const signup = createAsyncThunk("signup", async (data) => {
  const response = await fetch(`${proxy}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const status = await response.status;
  const responseBody = await response.json();
  return { data, responseBody, status };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.apiMsg = action.payload.message;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.apiMsg = action.payload.message;
    });
  },
});

export default userSlice.reducer;
