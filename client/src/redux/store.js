import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post";
import authReducer from "./userId";
const store = configureStore({
  reducer: {
    posts: postReducer, // The key "posts" must match the key used in useSelector
    auth : authReducer,
  },
});

export default store;