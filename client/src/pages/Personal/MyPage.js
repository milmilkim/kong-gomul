import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "../../slices/MemberSlice";
import { getRecents } from "../../slices/RecentsSlice";

import Profile from "../../components/Profile/Profile";
import LibraryIcons from "../../components/Profile/LibraryIcons";
import BooksItem from "../../components/BooksItem";
import ProfileEdit from "../../components/Profile/ProfileEdit";

import { FaCog } from "react-icons/fa";

const StyledFaCog = styled(FaCog)`
  font-size: 1.3rem;

  &:hover {
    animation: rotate_image 3s linear infinite;
    transform-origin: 50% 50%;
    cursor: pointer;
  }

  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
`;

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

  .profile_edit {
    text-align: right;
    margin: 20px 20px 0 0;
  }

  button {
    appearance: none;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  con3 {
    padding: 20px;
    position: relative;

    p {
      font-weight: bold;
      margin-bottom: 20px;
    }

    .more-btn {
      display: block;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      position: absolute;
      top: 12px;
      right: 0;
      background-color: #333;
      color: #eee;
    }

    .recent-list {
      padding: 10px;
      li {
        margin-right: 40px;
      }
    }
  }
`;

const MyPage = () => {
  //리덕스

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.member);
  const { data: recentsData } = useSelector((state) => state.recents);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getRecents());
  }, [dispatch]);

  return (
    <ProfileContainer>
      {data && (
        <div className="inner">
          <div className="profile_edit">
            <StyledFaCog
              onClick={(e) => {
                setIsOpen(true);
              }}
            />
          </div>

          {/* 프로필 */}
          <Profile data={data} />
          {/*프로필 편집*/}
          <ProfileEdit isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
          {/* 보고싶어요, 내 서재, 취향분석 아이콘 */}
          <LibraryIcons />

          <section className="con3">
            <h3>최근 조회한 작품</h3>
            <ul className="recent-list flex-row">
              {recentsData ? (
                recentsData
                  .slice(0, 5)
                  .map((book) => (
                    <BooksItem
                      key={book.id}
                      book={book}
                      itemWidth={"20%"}
                      itemHeight={"auto"}
                      itemHref={`/bookinfo/${book.id}`}
                    />
                  ))
              ) : (
                <>조회한 작품이 없습니다</>
              )}
            </ul>
          </section>
        </div>
      )}
    </ProfileContainer>
  );
};

export default MyPage;
