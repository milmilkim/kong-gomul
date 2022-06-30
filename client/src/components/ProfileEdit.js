import Modal from "./Modal";
import axios from "../config/axios";

import Spinner from "./spinner";
import { useState } from "react";

import styled from "styled-components";

const EditContainer = styled(Modal)``;

const ProfileEdit = ({ isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  // 데이터베이스에서 회원정보 가져오기

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
    </EditContainer>
  );
};

export default ProfileEdit;
