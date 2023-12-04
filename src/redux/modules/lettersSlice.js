import fakeData from "fakeData.json";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import json_api from "../../axios/json_api";
import axios from "axios";
const initialState = fakeData;

export const __addLetters = createAsyncThunk(
  "addLetter",

  async (payload, thunkAPI) => {
    try {
      const { id, content, avatar, writedTo, createdAt, userid, nickname } =
        payload;
      const newLetterList = {
        id,
        content,
        avatar,
        writedTo,
        createdAt,
        userid,
        nickname,
      };
      //json_api.js로 따로 만들어, 서버와 통신시 interceptor 부분을 구현하였는데,
      //.env의 url등등 다른것을 다 확인해 보았는데 서버 통신 오류가 떠서
      //일단
      const data = await axios.post(
        "http://localhost:5000/letters",
        newLetterList
      );
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const __deleteLetters = createAsyncThunk(
  "editLetters",
  async (payload, thunkAPI) => {
    const id = payload.id;
    // return state.filter((letter) => letter.id !== id);
  }
);
const letterSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return [newLetter, ...state];
    },
    deleteLetter: (state, action) => {
      const letterId = action.payload;
      return state.filter((letter) => letter.id !== letterId);
    },
    editLetter: (state, action) => {
      const { id, editingText } = action.payload;
      return state.map((letter) => {
        if (letter.id === id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    },
  },
  extraReducers: {
    //이곳을 찾아서 간다.
    [__addLetters.fulfilled]: (state, action) => {
      console.log("일로와 ");
      const newLetter = action.payload;
      return [newLetter, ...state];
    },
    [__deleteLetters.fulfilled]: (state, action) => {
      const letterId = action.payload;
      return state.filter((letter) => letter.id !== letterId);
    },
  },
});
export const { addLetter, deleteLetter, editLetter } = letterSlice.actions;
export default letterSlice.reducer;
