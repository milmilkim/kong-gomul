import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3001/api/book";
const params = {
  page: 1,
  size: 5,
  category: null,
};

export const getBookList = createAsyncThunk(
  "BookListSlice/getBookList",
  async (payload = null, { rejectWithValue }) => {
    let result = null;

    try {
      if (payload === null) {
        result = await axios.get(`${URL}?page=${params.page}&size=${params.size}`);
      } else {
        result = await axios.get(
          `${URL}
          ?page=${payload.params?.page ? payload.params?.page : params.page}
          &size=${payload.params?.size ? payload.params?.size : params.size}
          &category=${payload.params?.category ? payload.params?.category : params.category}`
        );
      }
    } catch (err) {
      result = rejectWithValue(err.response);
    }

    return result;
  }
);

const BookListSlice = createSlice({
  name: "booklist",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducer: {},
  extraReducers: {
    [getBookList.pending]: (state, { payload }) => {
      return { state, loading: true };
    },
    [getBookList.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getBookList.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
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
