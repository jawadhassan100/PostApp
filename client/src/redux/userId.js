import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: localStorage.getItem("userId") || "", // Initialize from localStorage if it exists
  };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      console.log("Setting UserId in reducer:", action.payload);
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload); // Save userId to localStorage
    },
    logout: (state) => {
        state.userId = "";
        localStorage.removeItem("userId"); // Clear userId from localStorage
      }
   
  },
});

// Action creators are generated for each case reducer function
export const { setUserId , logout } = authSlice.actions;

export default authSlice.reducer;
