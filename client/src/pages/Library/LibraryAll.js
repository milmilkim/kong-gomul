/**
 * 내 서재 페이지 (전체)
 */
import React, { memo, useEffect, useState } from "react";
import axios from "axios";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import LibraryNav from "../../components/LibraryNav";
import Spinner from "../../components/spinner";

const LibraryAll = memo(() => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBookList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/book", {
        params: {
          size: 30,
        },
      });
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      // ajax 로딩 종료
      setIsLoading(false);
    }
  };

  // 페이지가 열렸을 때,
  useEffect(() => {
    // 로딩 시작을 하고
    setIsLoading(true);

    // axios 요청을 한다.
    getBookList();
  }, []);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={isLoading} />

      {/* Navbar */}
      <LibraryNav />

      {/* Book List */}
      <ItemList>{data && data.map((book, index) => <BooksItem book={book} key={index} />)}</ItemList>
    </>
  );
});

export default LibraryAll;
