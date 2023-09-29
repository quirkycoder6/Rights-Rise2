import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user information like name, email, password etc.
  user: null,
  // jwt
  token: null,
  userscore: 0
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setUserScore: (state, action) => {
      state.userscore = action.payload.userscore;
    }
  },
});

export const { setLogin, setLogout, setUserScore } = authSlice.actions;
export default authSlice.reducer;
