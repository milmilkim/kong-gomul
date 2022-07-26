/**
 * 내 서재 보고싶어요 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getMyProfile } from "../../slices/MemberSlice";
import { getWishList } from "../../slices/WishSlice";

/* Components */
import LibraryWishesComponent from "../../components/Library/LibraryWishesComponent";

const LibraryWishes = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.wish);
  const [memberId, setMemberId] = useState(); // 멤버 아이디
  const [wishList, setWishList] = useState(); // 유저가 보고싶어요한 목록

  useEffect(() => {
    async function fetchData() {
      const {
        payload: {
          data: { id },
        },
      } = await dispatch(getMyProfile()); // 자신의 아이디를 가져온다.
      setMemberId(id);

      const {
        payload: { data },
      } = await dispatch(getWishList()); // 보고싶어요한 목록을 불러온다.

      setWishList(data);
    }

    fetchData();
  }, [dispatch]);

  return <LibraryWishesComponent memberId={memberId} loading={loading} wishList={wishList} />;
});

export default LibraryWishes;
