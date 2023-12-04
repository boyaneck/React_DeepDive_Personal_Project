import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const __Addnumber = createAsyncThunk("addnumber", (payload, thunkAPI) => {});
const initialState = {
  authenticated: "non-verified",
  id: "",
  pw: "",
  nickname: "",
  avatar: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      console.log("인증 리듀서", action);
      return {
        ...state,
        authenticated: action.payload.authenticated,
        id: action.payload.id,
        pw: action.payload.pw,
        nickname: action.payload.userNickname,
      };
    },
    getAuth: (state, action) => {
      return initialState;
    },
  },
});

export const { updateAuth, getAuth } = authSlice.actions;
export default authSlice.reducer;
