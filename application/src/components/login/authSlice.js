import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_IP } from "../../private";

const INITIAL_STATE = { email: "", token: "" };

const performLogin = async (email, password, thunkAPI) => {
  try {
    fetch(`${SERVER_IP}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          return { email: response.email, token: response.token };
        }
      });
  } catch (error) {
    console.error(error);
  }
};

export const login = createAsyncThunk("auth/loginStatus", performLogin);

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state, action) => {
      state = this.initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.email;
      state.token = action.token;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
