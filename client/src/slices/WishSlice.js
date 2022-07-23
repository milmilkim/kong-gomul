import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fulfilled, rejected, pending } from "../utils/ExtraReducer";

export const getWishList = createAsyncThunk("WishSlice/getWishList", async (payload, { rejectWithValue }) => {
  let URL = payload ? `api/wish/${payload.id}` : "api/wish";
  let result = null;
  try {
    result = await axios.get(URL);
  } catch (e) {
    result = rejectWithValue(e.response);
  }
  return result;
});

export const addWishList = createAsyncThunk("WishSlice/addWishList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.post("api/wish", payload);
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

export const deleteWishList = createAsyncThunk("WishSlice/deleteWishList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.delete(`api/wish/${payload}`);
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
    [getWishList.pending]: pending,
    [getWishList.fulfilled]: fulfilled,
    [getWishList.rejected]: rejected,

    [addWishList.pending]: pending,
    [addWishList.fulfilled]: fulfilled,
    [addWishList.rejected]: rejected,
  },
});

export default WishSlice.reducer;
