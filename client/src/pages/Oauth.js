/**
 * 소셜 로그인 하는 페이지
 */

import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tokenVerify } from "../slices/AuthSlice";
import Spinner from "../components/spinner";
import Container from "../components/Layout/Container";

export default function Oauth() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const code = new URL(window.location.href).searchParams.get("code");
  const platform = new URL(window.location.href).searchParams.get("platform");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccessToken = async (code, platform) => {
      try {
        setIsLoading(true);
        //인가코드로 액세스 토큰 설정
        const res = await axios.get(`api/auth/${platform}`, {
          baseURL: process.env.REACT_APP_BASE_URL,
          params: {
            code,
          },
        });

        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        window.localStorage.setItem("accessToken", accessToken); //localStorage에 토큰을 저장함
        window.localStorage.setItem("refreshToken", refreshToken);

        dispatch(tokenVerify(accessToken));
        navigate("/");
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAccessToken(code, platform);
  }, [code, platform, navigate, dispatch]);

  return (
    <Container>
      <Spinner visible={isLoading} />
      <h1>로그인중</h1>
      <p>{error}</p>
    </Container>
  );
}
