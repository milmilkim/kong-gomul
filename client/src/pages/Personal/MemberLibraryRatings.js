/**
 * 유저 서재 별점순 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/* Slice */
import { getLibrary } from "../../slices/LibrarySlice";

/* Components */
import LibraryRatingsComponent from "../../components/Library/LibraryRatingsComponent";

const MemberLibraryRatings = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.library); // 로딩여부

  const { id: memberId } = useParams(); // 특정 유저의 멤버 아이디
  const [reviewList, setReviewList] = useState(); // 유저가 작성한 리뷰 목록들

  useEffect(() => {
    async function fetchData() {
      const {
        payload: { data: reviewData },
      } = await dispatch(
        getLibrary({
          id: memberId,
        })
      ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
      setReviewList(reviewData);
    }

    fetchData();
  }, [dispatch, memberId]);

  return <LibraryRatingsComponent memberId={memberId} loading={loading} reviewList={reviewList} />;
});

export default MemberLibraryRatings;
