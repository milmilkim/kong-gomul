import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { fulfilled, pending, rejected } from "../utils/ExtraReducer";

/**
 * 추천 책 정보를 불러온다
 */

export const getRecoBookList = createAsyncThunk(
  "RecommendationSlice/getRecoBookList",
  async (payload = null, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get(`api/book/recommendations`);
    } catch (err) {
      result = rejectWithValue(err.response);
    }

    return result;
  }
);

const RecommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    data: null,
    loading: false,
    error: null,
    colors: null,
  },
  reducer: {},
  extraReducers: {
    [getRecoBookList.pending]: pending,
    [getRecoBookList.fulfilled]: fulfilled,
    [getRecoBookList.rejected]: rejected,
  },
});

export default RecommendationSlice.reducer;
