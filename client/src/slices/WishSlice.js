import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getWishList = createAsyncThunk("WishSlice/getWishList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/wish/");
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

const WishSlice = createSlice({
  name: "wish",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getWishList.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getWishList.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getWishList.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "ServerError",
        },
      };
    },
  },
});

export default WishSlice.reducer;
