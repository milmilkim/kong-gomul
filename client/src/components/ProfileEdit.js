import Modal from "./Modal";
import axios from "../config/axios";

import Spinner from "./spinner";
import { useState } from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setIsLogin } from "../slices/AuthSlice";

const EditContainer = styled(Modal)``;

const ProfileEdit = ({ isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 데이터베이스에서 회원정보 가져오기

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    navigate("/");
    dispatch(setIsLogin(false));
  };

  return (
    <EditContainer isOpen={isOpen} setIsOpen={setIsOpen} background={true} width={400}>
      {/* <Spinner visible={isLoading} /> */}
      <div className="flex-row">
        <img src="https://via.placeholder.com/75x75" alt="페이크 이미지" />
        <p>여기에 이메일</p>
      </div>
      <form>
        <input type="text" placeholder="닉네임 수정" />
        <input type="text" placeholder="한마디 수정" />
        <label for="profile-open">프로필 공개</label>
        <input type="checkbox" id="profile-open" />
        <button>탈퇴</button>
        <button>저장</button>
      </form>
      <button onClick={logout}>로그아웃</button>
    </EditContainer>
  );
};

export default ProfileEdit;
