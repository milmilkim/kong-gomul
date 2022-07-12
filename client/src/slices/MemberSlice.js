import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMyProfile = createAsyncThunk("MemberSlice/getMyProfile", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/member/me");
  } catch (e) {
    result = rejectWithValue(e.response);
  }
  return result;
});

const MemberSlice = createSlice({
  name: "member",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getMyProfile.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getMyProfile.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getMyProfile.rejected]: (state, { payload }) => {
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

export default MemberSlice.reducer;
