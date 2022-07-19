/**
 * 내 서재 페이지 (전체)
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CellMeasurer } from "react-virtualized";

/* Slice */
import { getLibrary } from "../../slices/LibrarySlice";
import { getMyProfile } from "../../slices/MemberSlice";

/* Components */
import BooksItem from "../../components/BooksItem";
import ItemList from "../../components/ItemList";
import LibraryNav from "../../components/LibraryNav";
import Spinner from "../../components/spinner";
import { cache, MasonryComponent } from "../../components/MasonryComponent";
import ResultNotFound from "../../components/ResultNotFound";

const LibraryAll = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.review); // 로딩여부

  const [memberId, setMemberId] = useState(); // 멤버 아이디
  const [reviewList, setReviewList] = useState(); // 유저가 작성한 리뷰 목록들

  /* 무한 스크롤 */
  const cellRenderer = ({ index, key, parent, style }) => {
    const book = reviewList[index];

    return (
      <CellMeasurer cache={cache} parent={parent} key={key} index={index}>
        {({ measure, registerChild }) => (
          <div style={style} ref={registerChild}>
            <BooksItem book={book} itemWidth={"100%"} />
          </div>
        )}
      </CellMeasurer>
    );
  };

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
        getLibrary({
          member_id: memberId,
        })
      ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
      setReviewList(reviewData);
    }

    fetchData();
  }, [dispatch, memberId]);

  return !memberId ? (
    <ResultNotFound>로그인 상태가 아닙니다.</ResultNotFound>
  ) : (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      {/* Navbar */}
      <LibraryNav />

      {/* Book List */}
      <ItemList>
        {reviewList && reviewList.length === 0 ? (
          <div>평가한 작품이 없습니다.</div> /* 평점이 없을 경우 */
        ) : (
          reviewList && <MasonryComponent data={reviewList} cellRenderer={cellRenderer} /> /* 평점이 있을 경우 */
        )}
      </ItemList>
    </>
  );
});

export default LibraryAll;
