import React, { memo, useState, useEffect } from "react";
import Login from "../components/Login";
import axios from "axios";

const Test = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBookList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "판타지 웹소설",
        },
      });
      console.log(res);
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  const handleButton = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div style={{ height: "1000vh" }}>
      <h1>테스트를 위한 페이지</h1>
      <button onClick={handleButton}>로그인</button>
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />

      {data !== null ? (
        <>
          {data.map((book) => (
            <ul key={book.id}>
              <li>{book.title}</li>
              <li>
                <img width="100" src={book.thumbnail} alt={book.title}></img>
              </li>
            </ul>
          ))}
        </>
      ) : (
        <>loading...(아무일도 없습니다.)</>
      )}
    </div>
  );
});

export default Test;
