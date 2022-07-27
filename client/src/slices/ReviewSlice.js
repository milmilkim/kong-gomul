import axios from "../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rejected, pending, fulfilled } from "../utils/ExtraReducer";
import { cloneDeep } from "lodash";
import Swal from "sweetalert2";

export const getReviewList = createAsyncThunk("ReviewSlice/getReviewList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/review", {
      params: {
        order: payload.order,
        rating: payload.rating,
        member_id: payload.member_id,
      },
    });
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

export const getReviewListByBookId = createAsyncThunk(
  "ReviewSlice/getReviewListByBookId",
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.get(`api/book/review/${payload.id}`, {
        params: {
          page: payload.page || 1,
          size: payload.size || 5,
        },
      });
    } catch (e) {
      result = rejectWithValue(e.response);
    }

    return result;
  }
);

export const addReviewItem = createAsyncThunk("ReviewSlice/addReviewItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.post(`/api/review/${payload.book_id}`, payload.data);
  } catch (err) {
    result = rejectWithValue(err.response);
    console.log(err);
    Swal.fire(err.response.data.message);
  }

  return result;
});

export const deleteReviewContents = createAsyncThunk(
  "ReviewSlice/deleteReviewItem",
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.post(`/api/review/${payload.book_id}`, { contents: null });
    } catch (err) {
      result = rejectWithValue(err.response);
      console.log(err);
      Swal.fire(err.response.data.message);
    }

    return result;
  }
);

const ReviewSlice = createSlice({
  name: "review",
  initialState: {
    myReview: null,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getReviewList.pending]: pending,
    [getReviewList.fulfilled]: fulfilled,
    [getReviewList.rejected]: rejected,

    [addReviewItem.pending]: pending,
    [addReviewItem.fulfilled]: (state, { payload }) => {
      if (payload?.data?.result) {
        // 기존의 상태값을 복사한다.(원본이 JSON이므로 깊은 복사를 수행해야 한다)
        const data = cloneDeep(state.data);

        //내가 작성한 글은 제외
        const filterdData = data.filter((v) => v.member_id !== payload.data.item.member_id);

        // 새로 저장된 결과를 기존 상태값 배열의 맨 앞에 추가한다.
        filterdData.unshift({ ...payload.data.item });

        return {
          ...state,
          data: filterdData,
          loading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }
    },
    [addReviewItem.rejected]: rejected,

    [deleteReviewContents.pending]: pending,
    [deleteReviewContents.fulfilled]: (state, { payload }) => {
      // 기존의 상태값을 복사한다.(원본이 JSON이므로 깊은 복사를 수행해야 한다)
      const data = cloneDeep(state.data);

      //내가 작성한 글은 제외
      const filterdData = data.filter((v) => v.member_id !== payload.data.item.member_id);

      return {
        ...state,
        data: filterdData,
        loading: false,
        error: null,
      };
    },
    [deleteReviewContents.rejected]: rejected,

    [getReviewListByBookId.pending]: pending,
    [getReviewListByBookId.fulfilled]: fulfilled,
    [getReviewListByBookId.rejected]: rejected,
  },
});

export default ReviewSlice.reducer;
