import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const singupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    addSignup: (state, action) => {
      state.push(action.payload);
    },
    getUser: (state, action) => {
      return state.filter((state) => state.id === action.payload.id);
    },
  },
});

export const { addSignup, getUser } = singupSlice.actions;
export default singupSlice.reducer;
