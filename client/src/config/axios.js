import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "x-access-token": window.localStorage.getItem("accessToken") || null,
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response: errorResponse, config: originalRequest } = error;

    console.log(originalRequest);

    if (errorResponse.status === 401) {
      const { data } = await Axios.get("/api/auth/refresh", {
        baseURL: process.env.REACT_APP_BASE_URL,
        params: {
          token: window.localStorage.getItem("refreshToken"),
        },
      });

      const { accessToken: newAccessToken } = data;
      window.localStorage.setItem("accessToken", newAccessToken);
      originalRequest.headers["x-access-token"] = newAccessToken;
      return Axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;
