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
import Spinner from "../spinner";
import Swal from "sweetalert2";
import axios from "../../config/axios";

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

  //비밀번호 변경 모달
  const [pwdEditIsOpen, setPwdEditIsOpen] = useState(false);
  //로딩
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} background={true} width={550} height={550}>
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
        {data.platform === "local" && (
          <div
            className="btn"
            onClick={(e) => {
              setPwdEditIsOpen(true);
            }}
          >
            비밀번호 변경
          </div>
        )}
        <Modal isOpen={pwdEditIsOpen} setIsOpen={setPwdEditIsOpen} width={300} height={300}>
          <h1>비밀번호 변경</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                if (e.target.password.value !== e.target.password_check.value) {
                  // Swal.fire("비밀번호 확인이 일치하지 않습니다...!");
                  Swal.fire("비밀번호 확인이 일치하지 않습니다");
                  return;
                }
                setIsLoading(true);
                await axios.patch("/api/member/" + data.id, {
                  password: e.target.password.value,
                });
                Swal.fire("변경 완료!");
                setPwdEditIsOpen(false);
              } catch (err) {
                Swal.fire(err.response.data.message);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <input type="password" name="password" placeholder="비밀번호" />
            <input type="password" name="password_check" placeholder="비밀번호 확인" />
            <button type="submit">변경</button>
          </form>
        </Modal>
        <Spinner visible={isLoading} />

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

    font-size: 0.9rem;

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

export default ProfileEdit;
