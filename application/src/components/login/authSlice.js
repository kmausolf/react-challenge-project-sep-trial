import { createSlice } from "@reduxjs/toolkit";
import { SERVER_IP } from '../../private'

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    token: null,
  },
  reducers: {
    login: {
      reducer: (state, action) => {
        if(action.payload) {
            state.email = action.payload.email;
            state.token = action.payload.token;
        }
      },
      prepare: (email, password) => {
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
                return { payload: { email: response.email, token: response.token }};
            }
          });
      },
    },
    logout: (state, action) => {
      state = this.initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;