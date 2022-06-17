/**
 * 소셜 로그인 하는 페이지
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const [error, setError] = useState(null);

  const code = new URL(window.location.href).searchParams.get("code");
  const platform = new URL(window.location.href).searchParams.get("platform");
  const navigate = useNavigate();

  const getAccessToken = async (code, platform) => {
    try {
      const res = await axios.get(`api/auth/${platform}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        params: {
          code,
        },
      });
      const accessToken = res.data.accessToken;
      window.localStorage.setItem("accessToken", accessToken); //localStorage에 토큰을 저장함
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };
  useEffect(() => {
    getAccessToken(code, platform);
  }, [code, platform, navigate]);

  return (
    <div>
      <h1>로그인중</h1>
      {<p>무언가 잘못되었습니다</p>}
    </div>
  );
}
