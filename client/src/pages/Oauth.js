/**
 * 소셜 로그인 하는 페이지
 */

import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Oauth() {
  const code = new URL(window.location.href).searchParams.get("code");
  const platform = new URL(window.location.href).searchParams.get("platform");
  const navigate = useNavigate();

  /**
   * 카카오로 로그인
   */
  const loginWithKakao = async (code) => {
    try {
      const res = await axios.get(`api/auth/loginWithKakao`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        params: {
          code,
        },
      });
      console.log(res);
      const accessToken = res.data.accessToken;
      window.localStorage.setItem("accessToken", accessToken); //localStorage에 토큰을 저장함
      navigate("/");
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  useEffect(() => {
    if (platform === "kakao") {
      loginWithKakao(code);
    } else if (platform === "google") {
      console.log("미구현~~!!! ^_^!!!");
    } else {
      console.error("잘못된 접근입니다");
      Navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>로그인중</h1>
      {true && <p>무언가가 잘못되었습니다</p>}
    </div>
  );
}
