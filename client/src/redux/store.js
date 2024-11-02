import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post";
import authReducer from "./userId";

const store = configureStore({
  reducer: {
    posts: postReducer, 
    auth : authReducer,
  },
});

export default store;