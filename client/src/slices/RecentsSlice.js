import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rejected, pending, fulfilled } from "../utils/ExtraReducer";

export const getRecents = createAsyncThunk("RecentsSlice/getRecents", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/library/recents");
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

const RecentsSlice = createSlice({
  name: "recents",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getRecents.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getRecents.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getRecents.rejected]: (state, { payload }) => {
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
