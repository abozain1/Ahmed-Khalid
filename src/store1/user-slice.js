import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  isLogged: false,
  isAdmin: false,
  entries: [],
  token: null,
  threshold: 0,
};
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    storeEntry(state, action) {
      if (action.payload[0]) {
        state.entries = action.payload;
      } else if (action.payload._id) {
        let arr = [...state.entries, action.payload];
        state.entries = arr;
      } else {
        state.entries = [];
      }
    },
    login(state, action) {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.threshold = action.payload.threshold;
      state.isLogged = true;
      state.isAdmin = action.payload.isAdmin;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAdmin", action.payload.isAdmin);
      localStorage.setItem("threshold", action.payload.threshold);
      localStorage.setItem("name", action.payload.name);
    },
    logout(state) {
      localStorage.clear();
      state.isLogged = false;
      state.entries = [];
    },
    checkLogin(state, action) {
      const token = localStorage.getItem("token");
      const isAdmin = localStorage.getItem("isAdmin");
      const threshold = localStorage.getItem("threshold");
      const name = localStorage.getItem("name");

      if (token) {
        state.isLogged = true;
        state.token = token;
        state.name = name;
        state.isAdmin = isAdmin;
        state.threshold = threshold;
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
