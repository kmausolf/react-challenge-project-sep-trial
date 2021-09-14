import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../components/login/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});
