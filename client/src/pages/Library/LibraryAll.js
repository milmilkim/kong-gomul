/**
 * 내 서재 페이지 (전체)
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getLibrary } from "../../slices/LibrarySlice";
import { getMyProfile } from "../../slices/MemberSlice";

/* Components */
import LibraryAllComponent from "../../components/Library/LibraryAllComponent";

const LibraryAll = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.library); // 로딩여부

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
        getLibrary({
          id: memberId,
        })
      ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
      setReviewList(reviewData);
      console.log(reviewData);
    }

    fetchData();
  }, [dispatch, memberId]);

  return <LibraryAllComponent memberId={memberId} loading={loading} reviewList={reviewList} />;
});

export default LibraryAll;
