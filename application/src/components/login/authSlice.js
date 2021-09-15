import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_IP } from "../../private";

const INITIAL_STATE = { email: "", token: "" };

const performLogin = async (email, password, thunkAPI) => {
  try {
    const loginResponse = await fetch(`${SERVER_IP}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    if(loginResponse.success) {
      return { email: loginResponse.email, token: loginResponse.token };
    }
    else {
      return INITIAL_STATE;
    }

  } catch (error) {
    console.error(error);
    return INITIAL_STATE;
  }
};

export const login = createAsyncThunk("auth/loginStatus", performLogin);

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state, action) => {
      // state = INITIAL_STATE doesn't work for whatever reason
      state.email = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
