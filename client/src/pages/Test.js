import React, { memo, useEffect, useState, useCallback } from "react";
import Login from "../components/Login";

const Test = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div style={{ height: "1000vh" }}>
      <h1>테스트를 위한 페이지</h1>
      <button onClick={handleButton}>로그인</button>
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
});

export default Test;
