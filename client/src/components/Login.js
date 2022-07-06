import Modal from "./Modal";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import axios from "../config/axios";

import { useDispatch } from "react-redux";
import { tokenVerify } from "../slices/AuthSlice";

import Spinner from "./spinner";

import styled from "styled-components";

import kakaoLogo from "../assets/img/kakao-logo.png";
import googleLogo from "../assets/img/google-logo.png";

/* 소셜로그인 ==================================================== */

/* 카카오 */
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI + "?platform=kakao";

const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

/* 구글 */

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI + "?platform=google";

const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`;

/*=============================================================== */

const LoginContainer = styled.div`
  .inquiry {
    margin: 20px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & div {
      margin: 5px 0;
      cursor: pointer;

      &:hover {
        color: ${(props) => props.theme.color.primaryColor};
      }
    }
  }
`;
const StyledSocialLogin = styled.div`
  width: 100%;
  position: relative;

  hr {
    border: none;

    &::before {
      width: 100%;
      height: 1px;
      content: " ";
      position: absolute;
      border-bottom: 1px solid ${(props) => props.theme.color.borderColor};
      top: 5px;
    }
    &::after {
      content: "OR";
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      padding: 0 10px;
      width: 20px;
      background-color: #fff;
    }
  }

  .social-icons {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;

    .item {
      text-indent: 100%;
      white-space: nowrap;
      overflow: hidden;

      width: 50px;
      height: 50px;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.color.borderColor};

      &.kakao {
        background-image: url(${kakaoLogo});
        background-color: #fee500;
      }

      &.google {
        background-image: url(${googleLogo});
        background-color: #fff;
      }
    }
  }
`;

const Login = ({ isOpen, setIsOpen }) => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [loginData, setLoginData] = useState({
    user_id: null,
    password: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsLoading(true);
        const res = await axios.post("/api/auth/login", loginData);
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("refreshToken", refreshToken); //localStorage에 토큰을 저장함
        dispatch(tokenVerify(accessToken));
        setIsOpen(false);
      } catch (err) {
        console.error(err);
        Swal.fire(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
    [loginData, dispatch, setIsOpen]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextLoginData = {
      ...loginData,
      [name]: value,
    };
    setLoginData(nextLoginData);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} background={true}>
      <Spinner visible={isLoading} />

      <LoginContainer>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <input type="text" name="user_id" placeholder="아이디"></input>
          <input type="password" name="password" placeholder="비밀번호"></input>
          <button type="submit">로그인</button>
        </form>

        <div className="inquiry">
          <div
            onClick={() => {
              setIsOpen2((isOpen2) => !isOpen2);
            }}
          >
            아이디 찾기
          </div>
          <div
            onClick={() => {
              setIsOpen3((isOpen3) => !isOpen3);
            }}
          >
            비밀번호 재설정
          </div>
        </div>

        <StyledSocialLogin>
          <hr />
          <div className="social-icons">
            <a href={KAKAO_AUTH_URI}>
              <div className="item kakao">카카오로 로그인</div>
            </a>
            <a href={GOOGLE_AUTH_URI}>
              <div className="item google">구글로 로그인</div>
            </a>
          </div>
        </StyledSocialLogin>
      </LoginContainer>

      <Modal isOpen={isOpen2} setIsOpen={setIsOpen2} width={300} height={300}>
        <h1>아이디 찾기</h1>
        <input type="text"></input>
        <button
          onClick={() => {
            Swal.fire("보내드렸습니다...").then((result) => {
              setIsOpen2(false);
            });
          }}
        >
          찾기
        </button>
        <p style={{ color: "red" }}>이메일 형식이 올바르지 않습니다</p>
      </Modal>
      <Modal isOpen={isOpen3} setIsOpen={setIsOpen3} width={300} height={300}>
        <h1>비밀번호 재발급</h1>
        <input type="text"></input>
        <input type="text"></input>
        <p style={{ color: "red" }}>이메일 형식이 올바르지 않습니다</p>

        <p>새 비밀번호를 설정할 수 있도록 이메일로 메시지가 전송됩니다</p>

        <button
          onClick={() => {
            Swal.fire("보내드렸습니다...").then((result) => {
              setIsOpen3(false);
            });
          }}
        >
          찾기
        </button>
      </Modal>
    </Modal>
  );
};

export default Login;
