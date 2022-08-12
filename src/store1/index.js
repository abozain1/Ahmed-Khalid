import { configureStore } from '@reduxjs/toolkit';


import userSlice from "./user-slice";

const Store = configureStore({
  reducer: userSlice.reducer ,
});

export default Store;
