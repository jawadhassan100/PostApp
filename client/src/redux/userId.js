import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: localStorage.getItem("userId") || "", // Initialize from localStorage if it exists
    token: localStorage.getItem("token")
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
    setToken:(state , action)=>{
      console.log("Setting token in reducer:", action.payload);
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
        state.userId = "";
        localStorage.removeItem("userId"); // Clear userId from localStorage
        localStorage.removeItem("author");
        localStorage.removeItem("token");
      }
   
  },
});

// Action creators are generated for each case reducer function
export const { setUserId , logout , setToken} = authSlice.actions;

export default authSlice.reducer;
