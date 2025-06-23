import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  status: user ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      // console.log(payload);
      state.user = action.payload.user;
      state.status = true;
    },
    logout: (state) => {
      // resetting the state
      state.user = null;
      state.status = false;

      localStorage.removeItem("user");
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
