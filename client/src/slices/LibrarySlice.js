import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLibrary = createAsyncThunk("LibrarySlice/getLibrary", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    if (!payload) {
      result = await axios.get("api/library/me");
    } else {
      result = await axios.get("api/library/me", {
        params: {
          order: payload.order,
          rating: payload.rating,
        },
      });
    }
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

const LibrarySlice = createSlice({
  name: "library",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getLibrary.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getLibrary.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getLibrary.rejected]: (state, { payload }) => {
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

export default LibrarySlice.reducer;
