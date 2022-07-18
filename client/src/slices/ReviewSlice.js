import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getReviewList = createAsyncThunk("ReviewSlice/getReviewList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/review", {
      params: {
        order: payload.order,
        rating: payload.rating,
        member_id: payload.member_id,
      },
    });
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

const ReviewSlice = createSlice({
  name: "review",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getReviewList.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getReviewList.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getReviewList.rejected]: (state, { payload }) => {
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

export default ReviewSlice.reducer;
