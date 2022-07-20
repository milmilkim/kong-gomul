import Modal from "../Modal";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../slices/MemberSlice";
import { setIsLogin } from "../../slices/AuthSlice";
import ProfileImage from "../ProfileImage";

const EditContainer = styled.div`
  img {
    width: 110px;
  }
`;
const ProfileEdit = ({ isOpen, setIsOpen, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    navigate("/");
    dispatch(setIsLogin(false));
  };

  const handleChange = (e) => {
    const next = {
      ...newProfile,
      [e.target.name]: e.target.value,
    };
    setNewProfile(next);
  };

  const handleCheckChange = (e) => {
    const next = {
      ...newProfile,
      [e.target.name]: e.target.checked,
    };
    setNewProfile(next);
  };
  const [newProfile, setNewProfile] = useState({});

  const saveProfile = async (e) => {
    e.preventDefault();
    dispatch(await updateProfile({ id: data.id, data: newProfile }));
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} background={true} width={550}>
      <EditContainer>
        {/* <Spinner visible={isLoading} /> */}
        <div className="flex-row">
          <ProfileImage src={data.profile_image} alt={data.nickname} />
          <p>{data.email}</p>
        </div>
        <form onChange={handleChange}>
          <input type="text" placeholder="닉네임" maxLength={20} defaultValue={data.nickname} name="nickname" />
          <textarea maxLength={240} placeholder="한마디" defaultValue={data.introduce} name="introduce" />
        </form>
        <label for="profile-open">프로필 공개</label>
        <input
          type="checkbox"
          id="profile-open"
          name="is_public"
          onChange={handleCheckChange}
          defaultChecked={data.is_public}
        />
        <button type="submit" onClick={saveProfile}>
          저장
        </button>
        <button onClick={logout}>로그아웃</button>
        <Link to="/withdrawal">탈퇴</Link>
      </EditContainer>
    </Modal>
  );
};

export default ProfileEdit;
