import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Layout/Container";
import axios from "../config/axios";
import Spinner from "../components/spinner";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../slices/AuthSlice";

export default function Withdrawal() {
  const completed = new URL(window.location.href).searchParams.get("completed");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = useCallback(async () => {
    /* 회원 탈퇴 하는 내용 */
    try {
      setIsLoading(true);
      await axios.delete("/api/member/");
      dispatch(setIsLogin(false));
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");
      dispatch(setIsLogin(false));
      navigate("/withdrawal?completed=true");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (completed === "true") {
    return (
      <Container>
        <h1>Good Bye</h1>
        <p>탈퇴가 완료되었습니다</p>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>정말 탈퇴하시겠어요?</h1>
        <hr />
        <button onClick={() => navigate("/")}>아니요</button>
        <button onClick={deleteUser}>네</button>
        <Spinner visible={isLoading} />
      </Container>
    );
  }
}
