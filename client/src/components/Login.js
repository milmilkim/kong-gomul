import Modal from "./Modal";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ isOpen, setIsOpen }) => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [loginData, setLoginData] = useState({
    user_id: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", loginData);
      const accessToken = res.data.accessToken;
      window.localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire(err.response.data.message);
    }
  };

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
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <input type="text" name="user_id"></input>
        <input type="password" name="password"></input>
        <button type="submit">로그인</button>
      </form>
      <hr />
      <button
        onClick={() => {
          setIsOpen2((isOpen2) => !isOpen2);
        }}
      >
        아이디 찾기
      </button>
      <button
        onClick={() => {
          setIsOpen3((isOpen3) => !isOpen3);
        }}
      >
        비밀번호 재설정
      </button>
      <hr />
      <button>소셜로그인</button>
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
