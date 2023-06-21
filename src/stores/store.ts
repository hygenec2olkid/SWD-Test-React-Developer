// store.js
import { configureStore } from "@reduxjs/toolkit";
import formSliceReducer from "./formSlide";

const store = configureStore({
  reducer: {
    formSlice: formSliceReducer,
  },
});

export default store;
