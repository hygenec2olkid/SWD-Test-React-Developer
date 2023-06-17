// store.js
import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todoSlice: todoSliceReducer,
  },
});

export default store;
