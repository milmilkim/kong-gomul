import Modal from "./Modal";
import { useState } from "react";
import Swal from "sweetalert2";

const Login = ({ isOpen, setIsOpen }) => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} background={true}>
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
