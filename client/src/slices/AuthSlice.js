import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

/**
 * tokenVerify(): 로컬스토리지의 액세스토큰의 유효성을 검사한다
 */
export const tokenVerify = createAsyncThunk("AuthSlice/tokenVerify", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    result = await axios.get("api/auth/check", {
      params: {
        token: payload,
      },
    });
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/**
 * join() : 회원가입
 */
export const join = createAsyncThunk("AuthSlice/join", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.post("api/auth/join", {
      user_id: payload.user_id,
      password: payload.password,
      password_check: payload.password_check,
      email: payload.email,
      birth_year: payload.birth_year,
      gender: payload.gender,
      code: payload.code,
      code_check: payload.code_check,
      personal: payload.personal,
      personal2: payload.personal2,
    });
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/**
 * getEmailCode() : 이메일 인증코드를 메일로 보낸다.
 */
export const getEmailCode = createAsyncThunk("AuthSlice/getEmailCode", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.get("api/auth/email", {
      params: { email: payload.email },
    });
  } catch (err) {
    result = rejectWithValue(err.response);
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
    data: null,
  },
  reducers: {
    setIsLogin: (state, action) => {
      if (action.payload === false) {
        return { ...state, isLogin: action.payload };
      }
    },
    setProfileImg: (state, action) => {
      return { ...state, info: { ...state.info, profile_image: action.payload } };
    },
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
        isLogin: false,
        error: {
          code: payload?.status ? payload.status : 500,
        },
      };
    },
    [join.pending]: (state, { payload }) => {
      return { ...state, isLoading: true };
    },
    [join.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        isLoading: false,
        error: null,
      };
    },
    [join.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        isLoading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "ServerError",
        },
      };
    },
    [getEmailCode.pending]: (state, { payload }) => {
      return { ...state, isLoading: true };
    },
    [getEmailCode.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        isLoading: false,
        error: null,
      };
    },
    [getEmailCode.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        isLoading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "ServerError",
        },
      };
    },
  },
});

export default AuthSlice.reducer; //리듀서 객체 내보내기
export const { setIsLogin, setProfileImg } = AuthSlice.actions;
