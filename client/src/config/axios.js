import Axios from "axios";

const accessToken = window.localStorage.getItem("accessToken");

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axios.interceptors.request.use(
  (request) => {
    request.headers["x-access-token"] = accessToken;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      }); //리프레시 토큰을 요청하고 저장

      const { accessToken: newAccessToken } = data;
      window.localStorage.setItem("accessToken", newAccessToken);
      originalRequest.headers["x-access-token"] = newAccessToken;
      return Axios(originalRequest); //재요청
    }
    return Promise.reject(error);
  }
);

export default axios;
