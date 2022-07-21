import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

/**
 * 책 1권의 정보와 리뷰 5개를 불러온다
 */
export const getBookInfo = createAsyncThunk(
  "BookInfoSlice/getBookInfo",
  async (payload = null, { rejectWithValue }) => {
    let result = null;

    try {
      if (!payload.id) {
        throw new Error("책 아이디가 존재하지 않습니다");
      }
      result = await axios.get(`/api/book/${payload.id}`);
    } catch (err) {
      result = rejectWithValue(err.response);
    }

    return result;
  }
);

const BookListSlice = createSlice({
  name: "bookInfo",
  initialState: {
    data: null,
    loading: false,
    error: null,
    colors: null,
  },
  reducer: {},
  extraReducers: {
    [getBookInfo.pending]: (state, { payload }) => {
      return { state, loading: true };
    },
    [getBookInfo.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data?.book_info,
        colors: payload?.data?.colors,
        loading: false,
        error: null,
      };
    },
    [getBookInfo.rejected]: (state, { payload }) => {
      return {
        colors: null,
        data: payload,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});

export default BookListSlice.reducer;
