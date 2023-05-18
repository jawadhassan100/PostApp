import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  userid: "",
  author: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setUserId: (state, action) => {
      state.userid = action.payload;
    },
    setAuthour: (state, action) => {
      state.author = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData, setUserId, setAuthour } = postSlice.actions;

export default postSlice.reducer;
