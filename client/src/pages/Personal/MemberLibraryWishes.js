/**
 * 유저 보고싶어요 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/* Slice */
import { getWishList } from "../../slices/WishSlice";

/* Components */
import LibraryWishesComponent from "../../components/Library/LibraryWishesComponent";

const MemberLibraryWishes = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.wish);
  const { id: memberId } = useParams(); // 특정 유저의 멤버 아이디
  const [wishList, setWishList] = useState(); // 유저가 보고싶어요한 목록

  useEffect(() => {
    async function fetchData() {
      const {
        payload: { data },
      } = await dispatch(
        getWishList({
          id: memberId, // 특정 유저의 보고싶어요한 목록을 불러온다.
        })
      );

      setWishList(data);
    }

    fetchData();
  }, [dispatch, memberId]);

  return <LibraryWishesComponent memberId={memberId} loading={loading} wishList={wishList} />;
});

export default MemberLibraryWishes;
