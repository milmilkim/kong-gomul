import React, { useEffect } from "react";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { getMemberProfile } from "../../slices/MemberSlice";

import Profile from "../../components/Profile/Profile";
import LibraryIcons from "../../components/Profile/LibraryIcons";
import { useParams } from "react-router-dom";

const ProfileContainer = styled.div`
  text-align: center;
  width: 640px;
  margin: auto;
  border: solid 1px #eee;
  margin-bottom: 20px;
  border-radius: 10px;

  h3 {
    font-weight: bolder;
    margin: 10px;
  }

  .private {
    color: #b2b2b2;
    margin: 20px;
  }
`;

const MyPage = () => {
  //리덕스

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.member);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getMemberProfile(id));
  }, [dispatch, id]);

  return (
    <ProfileContainer>
      {data && (
        <div className="inner">
          {/* 프로필 */}
          <Profile data={data} />
          {data.is_public ? <LibraryIcons member_id={id} /> : <div className="private">비공개 유저입니다</div>}
        </div>
      )}
    </ProfileContainer>
  );
};

export default MyPage;
