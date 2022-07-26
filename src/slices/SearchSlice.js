import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSearchResult = createAsyncThunk("SearchSlice/getSearchResult", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/search", {
      params: {
        query: payload.query,
        type: payload.type,
      },
    });
  } catch (e) {
    result = rejectWithValue(e.response);
  }
  return result;
});

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getSearchResult.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getSearchResult.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getSearchResult.rejected]: (state, { payload }) => {
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

export default SearchSlice.reducer;
