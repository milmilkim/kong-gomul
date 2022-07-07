/**
 * 내 서재 페이지 (전체)
 */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getReviewList } from "../../slices/ReviewSlice";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import LibraryNav from "../../components/LibraryNav";
import Spinner from "../../components/spinner";

const LibraryAll = memo(() => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.review); // 검색결과, 로딩여부

  useEffect(() => {
    dispatch(
      getReviewList({
        member_id: 18, // <--------
      })
    );
  }, [dispatch]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      {/* Navbar */}
      <LibraryNav />

      {/* Book List */}
      <ItemList>{data && data.map((book, index) => <BooksItem book={book.book} key={index} />)}</ItemList>
    </>
  );
});

export default LibraryAll;
