import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, rejected, fulfilled } from "../utils/ExtraReducer";
import { cloneDeep } from "lodash";

export const getMyProfile = createAsyncThunk("MemberSlice/getMyProfile", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/member/me");
  } catch (e) {
    result = rejectWithValue(e.response);
  }
  return result;
});

export const updateProfile = createAsyncThunk("MemberSlice/updateProfile", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    await axios.patch(`api/member/${payload.id}`, payload.data);
    return payload.data;
  } catch (e) {
    result = rejectWithValue(e.response);
  }
  return result;
});

export const getMemberProfile = createAsyncThunk(
  "MemberSlice/getMemberProfile",
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.get(`api/member/${payload}`);
    } catch (e) {
      result = rejectWithValue(e.response);
    }
    return result;
  }
);

const MemberSlice = createSlice({
  name: "member",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getMyProfile.pending]: pending,
    [getMyProfile.fulfilled]: fulfilled,
    [getMyProfile.rejected]: rejected,

    [getMemberProfile.pending]: pending,
    [getMemberProfile.fulfilled]: fulfilled,
    [getMemberProfile.rejected]: rejected,

    [updateProfile.pending]: pending,
    [updateProfile.fulfilled]: (state, { payload }) => {
      const data = cloneDeep(state.data);
      const newData = {
        ...data,
        ...payload,
      };

      return {
        loading: false,
        error: null,
        data: newData,
      };
    },
    [updateProfile.rejected]: rejected,
  },
});

export default MemberSlice.reducer;
