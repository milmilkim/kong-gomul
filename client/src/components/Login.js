import Modal from "./Modal";
import { useState } from "react";

const Login = ({ isOpen, setIsOpen }) => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>로그인</h1>
      <input type="text"></input>
      <input type="password"></input>
      <button>로그인</button>
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
        <button>찾기</button>
        <p style={{ color: "red" }}>이메일 형식이 올바르지 않습니다</p>
      </Modal>
      <Modal isOpen={isOpen3} setIsOpen={setIsOpen3} width={200} height={500}>
        다중모달
      </Modal>
    </Modal>
  );
};

export default Login;
