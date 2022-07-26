import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import Spinner from "../components/spinner";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../slices/AuthSlice";
import styled from "styled-components";

const StyledContainer = styled.div`
  min-height: 50vh;
  width: 1200px;
  margin: auto;

  .alert {
    margin-top: 100px;

    button {
      width: 100px;
      border: none;
      margin: 10px 10px 0 0;
      padding: 5px 0;
      cursor: pointer;

      &.no {
        background-color: #80ced6;
      }
    }
  }
`;

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
  }, [dispatch, navigate]);

  if (completed === "true") {
    return (
      <StyledContainer>
        <div className="alert">
          <h1 style={{ fontSize: "2rem" }}>Good Bye</h1>
          <p>탈퇴가 완료되었습니다</p>
        </div>
      </StyledContainer>
    );
  } else {
    return (
      <StyledContainer>
        <div className="alert">
          <h1 style={{ fontSize: "2rem" }}>정말 탈퇴하시겠어요?</h1>
          <br />
          <p>탈퇴시 개인정보와 데이터는 즉시 파기되며 다시는 복구할 수 없습니다.</p>
          <button className="no" onClick={() => navigate("/")}>
            아니요
          </button>
          <button className="yes" onClick={deleteUser}>
            네
          </button>
          <Spinner visible={isLoading} />
        </div>
      </StyledContainer>
    );
  }
}
