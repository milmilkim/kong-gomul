import Axios from "axios";

const accessToken = window.localStorage.getItem("accessToken");

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axios.defaults.withCredentials = true;

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

    if (errorResponse.status === 401) {
      const { data } = await Axios.get("/api/auth/refresh", {
        baseURL: process.env.REACT_APP_BASE_URL,
        params: {
          token: window.localStorage.getItem("refreshToken"),
        },
      }); //리프레시 토큰으로 새 액세스 토큰 요청

      const { accessToken: newAccessToken } = data;
      window.localStorage.setItem("accessToken", newAccessToken); //새 액세스 토큰을 로컬스토리지에 저장
      originalRequest.headers["x-access-token"] = newAccessToken; //새 액세스 토큰을 헤더에 설정
      return Axios(originalRequest); //재요청
    }
    return Promise.reject(error);
  }
);

export default axios;
