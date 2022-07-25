import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

/**
 * description: 서적 리스트를 가져온다.
 */
export const getBookList = createAsyncThunk(
  "BookListSlice/getBookList",
  async (payload = null, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get("api/book", {
        params: {
          page: payload.page,
          size: payload.size,
          category: payload.category,
        },
      });
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
      return { ...state, loading: true };
    },
    [getBookList.fulfilled]: (state, { meta, payload }) => {
      return {
        data: meta.arg.page > 1 ? state.data.concat(payload?.data) : payload?.data,
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