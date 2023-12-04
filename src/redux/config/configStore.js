import letters from "redux/modules/lettersSlice";
import member from "redux/modules/memberSlice";
import authSlice from "redux/modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "redux-devtools-extension";
import signupSlice from "redux/modules/signupSlice";
const store = configureStore({
  reducer: { member, letters, authSlice, signupSlice },
});
export default store;
