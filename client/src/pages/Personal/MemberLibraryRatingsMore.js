/**
 * 유저 서재 별점순 더보기 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getLibrary } from "../../slices/LibrarySlice";
import { getMemberProfile } from "../../slices/MemberSlice";

/* Components */
import LibraryRatingsMoreComponent from "../../components/Library/LibraryRatingsMoreComponent";
import ResultNotFound from "../../components/ResultNotFound";

const MemberLibraryRatingsMore = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.library); // 검색결과, 로딩여부

  const { id: memberId } = useParams(); // 특정 유저의 멤버 아이디
  const [memberPublic, setMemberPublic] = useState(); // 특정 유저가 공개 계정인지 여부
  const [reviewList, setReviewList] = useState(); // 유저가 작성한 리뷰 목록들

  /* 파라미터로 전달받은 rating을 가져온다. */
  const { rating } = useParams();
  const ratingTitle = parseFloat(rating);

  useEffect(() => {
    async function fetchData() {
      const {
        payload: {
          data: { is_public },
        },
      } = await dispatch(getMemberProfile(memberId)); // 공개 계정인지 여부
      setMemberPublic(is_public);

      if (memberPublic) {
        const {
          payload: { data: reviewData },
        } = await dispatch(
          getLibrary({
            id: memberId,
            rating: parseFloat(rating),
          })
        ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
        setReviewList(reviewData);
      }
    }

    fetchData();
  }, [dispatch, memberId, memberPublic, rating]);

  return (
    <>
      {memberPublic ? (
        <LibraryRatingsMoreComponent
          memberId={memberId}
          loading={loading}
          reviewList={reviewList}
          ratingTitle={ratingTitle}
        />
      ) : (
        <ResultNotFound>비공개 유저입니다</ResultNotFound>
      )}
    </>
  );
});

export default MemberLibraryRatingsMore;
