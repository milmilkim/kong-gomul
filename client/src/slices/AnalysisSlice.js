import { rejected, pending, fulfilled } from "../utils/ExtraReducer";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const getAnalysis = createAsyncThunk("AnalysisSlice/getAnalysis", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/member/me/analysis");
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

export const getMemberAnalysis = createAsyncThunk("AnalysisSlice/getAnalysis", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get(`/api/member/${payload}/analysis`);
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});
const AnalysisSlice = createSlice({
  name: "analysis",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getAnalysis.pending]: pending,
    [getAnalysis.fulfilled]: fulfilled,
    [getAnalysis.rejected]: rejected,
  },
});

export default AnalysisSlice.reducer; //리듀서 객체 내보내기
