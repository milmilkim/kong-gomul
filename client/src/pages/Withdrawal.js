import React from "react";
import { useNavigate } from "react-router-dom";
export default function Withdrawal() {
  const completed = new URL(window.location.href).searchParams.get("completed");

  const navigate = useNavigate();
  const deleteUser = () => {
    /* 회원 탈퇴 하는 내용 */

    navigate("/widthdrawal?completed=true");
  };

  if (completed === "true") {
    return (
      <>
        <h1>Good Bye</h1>
        <p>탈퇴가 완료되었습니다</p>
      </>
    );
  } else {
    return (
      <>
        <h1>정말 탈퇴하시겠어요?</h1>
        <hr />
        <button onClick={() => navigate("/")}>아니요</button>
        <button onClick={deleteUser}>네</button>
      </>
    );
  }
}
