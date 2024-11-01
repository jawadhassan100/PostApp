import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  author: localStorage.getItem("author") || "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setAuthour: (state, action) => {
        console.log("Setting Author in reducer:", action.payload);
      state.author = action.payload;
      localStorage.setItem("author", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData,  setAuthour } = postSlice.actions;

export default postSlice.reducer;
