/**
 * 내 서재 페이지 (전체)
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getReviewList } from "../../slices/ReviewSlice";
import { getMyProfile } from "../../slices/MemberSlice";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import LibraryNav from "../../components/LibraryNav";
import Spinner from "../../components/spinner";

const LibraryAll = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.review); // 로딩여부

  const [memberId, setMemberId] = useState(); // 멤버 아이디
  const [reviewList, setReviewList] = useState(); // 유저가 작성한 리뷰 목록들

  useEffect(() => {
    async function fetchData() {
      const {
        payload: {
          data: { id },
        },
      } = await dispatch(getMyProfile()); // 멤버 아이디를 가져온다.
      setMemberId(id);

      const {
        payload: { data: reviewData },
      } = await dispatch(
        getReviewList({
          member_id: memberId,
        })
      ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
      setReviewList(reviewData);
    }

    fetchData();
  }, [dispatch, memberId]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      {/* Navbar */}
      <LibraryNav />

      {/* Book List */}
      <ItemList>{reviewList && reviewList.map((book, index) => <BooksItem book={book.book} key={index} />)}</ItemList>
    </>
  );
});

export default LibraryAll;
