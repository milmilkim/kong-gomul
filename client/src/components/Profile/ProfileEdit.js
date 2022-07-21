import Modal from "../Modal";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../slices/MemberSlice";
import { setIsLogin } from "../../slices/AuthSlice";
import ProfileImage from "../ProfileImage";
import Switch from "../Form/Switch";
import TextArea from "../Form/TextArea";

const EditContainer = styled.div`
  .profile {
    img {
      width: 110px;
      height: 110px;
    }

    .email {
      font-size: 0.8rem;
    }
    margin-bottom: 10px;
  }

  .btn {
    text-align: center;
    cursor: pointer;
    line-height: 2;
    border-radius: 10px;

    &.logout {
      font-size: 0.9rem;
    }

    &.leave {
      color: #d64161;
      font-size: 0.8rem;
    }

    &.save {
      width: 100px;
      margin: auto;
      border: solid 2px #ffc0cb;
      transition: all 300ms ease;
      &:hover {
        background-color: #ffc0cb;
        color: #fff;
      }
    }
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
        <div className="profile">
          <ProfileImage src={data.profile_image} alt={data.nickname} />
          <p className="email">{data.email}</p>
        </div>
        <form onChange={handleChange}>
          <input type="text" placeholder="닉네임" maxLength={20} defaultValue={data.nickname} name="nickname" />
          <TextArea
            maxLength={240}
            placeholder="한마디"
            defaultValue={data.introduce}
            name="introduce"
            height="100px"
          />
        </form>

        <Switch
          label="프로필 공개"
          color="#FFC0CB"
          onChange={handleCheckChange}
          name="is_public"
          defaultChecked={data.is_public}
        />
        <div className="btn save" type="submit" onClick={saveProfile}>
          저장
        </div>
        <div className="btn logout" onClick={logout}>
          로그아웃
        </div>
        <div className="btn leave">
          <Link to="/withdrawal">탈퇴</Link>
        </div>
      </EditContainer>
    </Modal>
  );
};

export default ProfileEdit;
