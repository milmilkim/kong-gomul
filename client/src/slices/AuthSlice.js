import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

/**
 * tokenVerify(): 로컬스토리지의 액세스토큰의 유효성을 검사한다
 */
export const tokenVerify = createAsyncThunk("AuthSlice/tokenVerify", async (payload) => {
  let result = null;
  try {
    result = await axios.get("api/auth/check", {
      headers: {
        "x-access-token": payload || window.localStorage.getItem("accessToken"),
      },
    });
  } catch (err) {
    result = err.response;
    console.error(err);
  }

  return result;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    isLoading: false,
    id: null,
    nickname: null,
    error: null,
  },
  extraReducers: {
    [tokenVerify.pending]: (state, { payload }) => {
      return { ...state, isLoading: true };
    },
    [tokenVerify.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        id: payload?.data.info.id,
        info: payload?.data.info,
        isLogin: true,
      };
    },
    [tokenVerify.rejected]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: {
          code: payload?.status ? payload.status : 500,
        },
      };
    },
  },
});

export default AuthSlice.reducer; //리듀서 객체 내보내기
