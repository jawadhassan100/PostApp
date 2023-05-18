import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./post";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
