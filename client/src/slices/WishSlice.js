import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fulfilled, rejected, pending } from "../utils/ExtraReducer";
import { cloneDeep } from "lodash";

export const getWishList = createAsyncThunk("WishSlice/getWishList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/wish");
  } catch (e) {
    result = rejectWithValue(e.response);
  }
  return result;
});

export const addWishList = createAsyncThunk("wishSlice/addWishList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.post("api/wish", payload);
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

export const deleteWishList = createAsyncThunk("wishSlice/deleteWishList", async (payload, { rejectWithValue }) => {
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
