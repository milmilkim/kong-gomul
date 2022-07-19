import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rejected, pending, fulfilled } from "../utils/ExtraReducer";

export const getRecents = createAsyncThunk("RecentsSlice/getRecents", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/library/recents");
    console.log(result);
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
    [getRecents.pending]: pending,
    [getRecents.fulfilled]: fulfilled,
    [getRecents.rejected]: rejected,
  },
});

export default RecentsSlice.reducer;
