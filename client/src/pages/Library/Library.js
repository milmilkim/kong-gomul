/**
 * 내 서재 페이지
 */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

/* slices */
import { getMemberProfile } from "../../slices/MemberSlice";

/* Components */
import Spinner from "../../components/spinner";

/* Styled Components */
const LibraryContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .libraryTitle {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 2rem;
    margin: 1rem 0;
  }
`;

const Library = memo(() => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.member);
  const { id: memberId } = useParams(); // 특정 유저의 멤버 아이디

  useEffect(() => {
    if (memberId) {
      dispatch(getMemberProfile(memberId));
    }
  }, [dispatch, memberId]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <LibraryContainer>
        {/* Title */}
        {data && (
          <NavLink to={memberId ? "#" : "/library"}>
            <h3 className="libraryTitle">{memberId ? `${data.nickname}님의 서재` : "내 서재"}</h3>
          </NavLink>
        )}

        <Outlet />
      </LibraryContainer>
    </>
  );
});

export default Library;
