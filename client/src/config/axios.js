import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "x-access-token": window.localStorage.getItem("accessToken") || null,
  },
});

export default axios;
