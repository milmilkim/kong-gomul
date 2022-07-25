/**
 * 유저 서재 페이지 (전체)
 */
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/* Slice */
import { getLibrary } from "../../slices/LibrarySlice";
import { getMemberProfile } from "../../slices/MemberSlice";

/* Components */
import LibraryAllComponent from "../../components/Library/LibraryAllComponent";
import ResultNotFound from "../../components/ResultNotFound";

const MemberLibraryAll = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.review); // 로딩여부

  const { id: memberId } = useParams(); // 특정 유저의 멤버 아이디
  const [memberPublic, setMemberPublic] = useState(); // 특정 유저가 공개 계정인지 여부
  const [reviewList, setReviewList] = useState(); // 유저가 작성한 리뷰 목록들

  useEffect(() => {
    async function fetchData() {
      const {
        payload: {
          data: { is_public },
        },
      } = await dispatch(getMemberProfile(memberId)); // 공개 계정인지 여부
      setMemberPublic(is_public);

      // 공개 계정이라면
      if (memberPublic) {
        const {
          payload: { data: reviewData },
        } = await dispatch(
          getLibrary({
            id: memberId,
          })
        ); // 가져온 멤버 아이디와 일치하는 회원이 작성한 리뷰 목록을 가져온다.
        setReviewList(reviewData);
      }
    }

    fetchData();
  }, [dispatch, memberId, memberPublic]);

  return (
    <>
      {memberPublic ? (
        <LibraryAllComponent memberId={memberId} loading={loading} reviewList={reviewList} />
      ) : (
        <ResultNotFound>비공개 유저입니다</ResultNotFound>
      )}
    </>
  );
});

export default MemberLibraryAll;
