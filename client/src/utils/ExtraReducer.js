const pending = (state, { payload }) => {
  return { ...state, loading: true };
};

const fulfilled = (state, { payload }) => {
  return {
    ...state,
    data: payload?.data,
    loading: false,
    error: null,
  };
};

const rejected = (state, { payload }) => {
  return {
    ...state,
    loading: false,
    error: {
      data: payload?.data,
      loading: false,
      error: {
        code: payload?.status ? payload.status : 500,
        message: payload?.data?.message ? payload?.data?.message : "Server Error",
      },
    },
  };
};

export { pending, fulfilled, rejected };
