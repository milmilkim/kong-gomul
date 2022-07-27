import React, { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* lib */
import RegexHelper from "../lib/RegexHelper.js";

/* slices */
import { getEmailCode, join } from "../slices/AuthSlice";

/* Components */
import Spinner from "../components/spinner";

/* alert */
import Swal from "sweetalert2";

/* Styled Components */
const JoinContainer = styled.div`
  form {
    width: 350px;
    margin: 0 auto;
    padding-bottom: 30px;

    .form-container {
      padding-bottom: 25px;
    }

    input[type="checkbox"] {
      vertical-align: middle;
    }

    label {
      font-size: 12px;
      line-height: 1;
    }

    h2 {
      padding: 20px 0;
      text-align: center;
      font-weight: bold;
    }

    p {
      font-size: 12px;
    }

    button {
      cursor: pointer;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="number"],
    select,
    button {
      display: block;
      width: 350px;
      height: 30px;
      margin-top: 10px;
      border-radius: 3px;
      appearance: none;
      outline: none;
      border: 1px solid #333;
      padding: 0 7px;

      &.email-btn,
      &.submit-btn {
        margin-top: 10px;
        height: 40px;
        color: #eee;
        background-color: #333;
        border-radius: 3px;

        &.email-btn {
          width: 350px;
        }

        &.submit-btn {
          width: 130px;
          margin: 10px auto;
        }
      }

      &.terms-infobox {
        border-radius: 0;
        height: 120px;
        overflow: scroll;
        text-overflow: ellipsis;
      }
    }

    .flex-row {
      justify-content: space-between;

      input {
        width: 169px;
      }
    }

    .alertMsg {
      font-size: 12px;
      color: red;
    }
  }
`;

const Join = memo(() => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const inputRef = useRef([]);
  const [inputs, setInputs] = useState({
    id: "",
    email: "",
    pw: "",
    pwCheck: "",
    birth: "",
    gender: "",
    personal: false,
    personal2: false,
    codeCheck: "",
  });

  // 구조분해
  const { id, email, pw, pwCheck, birth, gender, personal, personal2, codeCheck } = inputs;

  // 유효성 검사 메시지 출력
  const [idMessage, setIdMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [birthSexMessage, setBirthSexMessage] = useState("");
  const [termMessage, setTermMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");

  // 이메일 인증코드
  const [code, setCode] = useState("");
  // 이메일 로딩
  const [emailLoading, setEmailLoading] = useState(false);

  const changeInput = useCallback(
    (e) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
      setIdMessage("");
      setEmailMessage("");
      setPwMessage("");
      setBirthSexMessage("");
      setTermMessage("");
      setCodeMessage("");
    },
    [inputs]
  );

  const changeCheckBox = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.checked,
    });
  };

  const submitForm = useCallback(
    async (e) => {
      e.preventDefault();

      // 유효성 검사
      try {
        RegexHelper.value(id, "아이디를 입력해주세요.");
        RegexHelper.id(id, "아이디는 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)로만 입력할 수 있습니다.");
        RegexHelper.value(email, "이메일을 입력해주세요.");
        RegexHelper.email(email, "이메일 형식에 맞게 입력해주세요.");
        RegexHelper.value(codeCheck, "이메일 인증코드를 입력해주세요.");
        RegexHelper.compareTo(code, codeCheck, "이메일 인증코드가 일치하지 않습니다.");
        RegexHelper.password(pw, "비밀번호는 8자 이상 16자 이하, 문자, 특수문자, 숫자를 포함해야 합니다");
        RegexHelper.password(pwCheck, "비밀번호 확인은 8자 이상 16자 이하, 문자, 특수문자, 숫자를 포함해야 합니다");
        RegexHelper.compareTo(pw, pwCheck, "비밀번호가 일치하지 않습니다.");
        RegexHelper.value(birth, "출생년도를 입력해주세요.");
        RegexHelper.minLength(birth, 4, "출생년도 4자리를 입력해주세요.");
        RegexHelper.maxLength(birth, 4, "출생년도 4자리를 입력해주세요.");
        RegexHelper.gender(gender, "성별을 입력해주세요.");
        RegexHelper.value(personal, "필수항목을 체크해주세요.");
      } catch (e) {
        if (e.field === id) {
          setIdMessage(e.message);
          inputRef.current[0].focus();
        } else if (e.field === email) {
          setEmailMessage(e.message);
          inputRef.current[1].focus();
        } else if (e.field === code) {
          setCodeMessage(e.message);
          inputRef.current[8].focus();
        } else if (e.field === pw) {
          setPwMessage(e.message);
          inputRef.current[2].focus();
        } else if (e.field === pwCheck) {
          setPwMessage(e.message);
          inputRef.current[3].focus();
        } else if (e.field === birth) {
          setBirthSexMessage(e.message);
          inputRef.current[4].focus();
        } else if (e.field === gender) {
          setBirthSexMessage(e.message);
          inputRef.current[5].focus();
        } else if (e.field === personal) {
          setTermMessage(e.message);
          inputRef.current[6].focus();
        } else if (e.field === personal2) {
          setTermMessage(e.message);
          inputRef.current[7].focus();
        }
      }

      // 회원가입 요청
      const {
        payload: { data },
      } = await dispatch(
        join({
          user_id: id,
          password: pw,
          password_check: pwCheck,
          email: email,
          birth_year: birth,
          gender: gender,
          code: code,
          code_check: codeCheck,
          personal: personal,
          personal2: personal2,
        })
      );
      if (data.message === "ok") {
        Swal.fire("가입 완료", "", "success");
        navigate("/");
      }
    },

    [navigate, dispatch, id, pw, pwCheck, email, birth, gender, personal, personal2, code, codeCheck]
  );

  const clickEmailCode = async () => {
    try {
      setEmailLoading(true);
      const {
        payload: {
          data: { email_code },
        },
      } = await dispatch(getEmailCode({ email }));
      setCode(email_code);
      Swal.fire("입력하신 이메일로 인증 코드를 보내드렸습니다", "", "success");
    } catch (err) {
      Swal.fire(err.reponse.data.message, "", "error");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <>
      <Spinner visible={isLoading || emailLoading} />

      <JoinContainer>
        <div className="inner">
          <form onSubmit={submitForm}>
            <h2>회원가입</h2>
            <p>필수 입력</p>
            <div className="form-container">
              {/* 아이디 입력 */}
              <input
                type="text"
                placeholder="아이디"
                name="id"
                value={id}
                onChange={changeInput}
                ref={(el) => (inputRef.current[0] = el)}
              />
              <span className="alertMsg">{idMessage}</span>
              {/* 이메일 입력 */}
              <input
                type="text"
                placeholder="이메일"
                name="email"
                value={email}
                onChange={changeInput}
                ref={(el) => (inputRef.current[1] = el)}
              />
              <span className="alertMsg">{emailMessage}</span>
              <button type="button" className="email-btn" onClick={clickEmailCode}>
                이메일 인증
              </button>
              {/* 이메일 인증 코드 */}
              <input
                type="text"
                placeholder="이메일 인증 코드"
                name="codeCheck"
                value={codeCheck}
                onChange={changeInput}
                ref={(el) => (inputRef.current[8] = el)}
              />
              <span className="alertMsg">{codeMessage}</span>
            </div>

            <div className="form-container">
              {/* 비밀번호 */}
              <input
                type="password"
                placeholder="비밀번호"
                name="pw"
                value={pw}
                onChange={changeInput}
                ref={(el) => (inputRef.current[2] = el)}
              />
              {/* 비밀번호 확인 */}
              <input
                type="password"
                placeholder="비밀번호 확인"
                name="pwCheck"
                value={pwCheck}
                onChange={changeInput}
                ref={(el) => (inputRef.current[3] = el)}
              />
              <span className="alertMsg">{pwMessage}</span>
            </div>

            <p>선택 입력</p>
            <div className="form-container">
              <div className="flex-row">
                {/* 출생년도 */}
                <input
                  type="number"
                  placeholder="출생년도 네 자리"
                  name="birth"
                  value={birth}
                  onChange={changeInput}
                  ref={(el) => (inputRef.current[4] = el)}
                />
                {/* 성별 */}
                <select name="gender" value={gender} onChange={changeInput} ref={(el) => (inputRef.current[5] = el)}>
                  <option value="">성별</option>
                  <option value="M">남자</option>
                  <option value="F">여자</option>
                </select>
              </div>
              <span className="alertMsg">{birthSexMessage}</span>
            </div>

            {/* 개인정보 약관 */}
            <div className="form-container term-container">
              <input type="text" defaultValue="여기에 약관" className="terms-infobox" />
              <input
                type="checkbox"
                id="personal"
                name={"personal"}
                checked={personal}
                onChange={changeCheckBox}
                ref={(el) => (inputRef.current[6] = el)}
              />
              <label htmlFor="personal">개인정보 수집 및 이용 동의(필수)</label>
              <span className="alertMsg">{termMessage}</span>
              {/* 약관 */}
              <input type="text" defaultValue="여기에 약관" className="terms-infobox" />
              <input
                type="checkbox"
                id="personal2"
                name={"personal2"}
                checked={personal2}
                onChange={changeCheckBox}
                ref={(el) => (inputRef.current[7] = el)}
              />
              <label htmlFor="birthdate">성별, 생년 정보 제공 동의(선택)</label>
            </div>

            {/* 가입버튼 */}
            <button type="submit" className="submit-btn">
              회원가입
            </button>
          </form>
        </div>
      </JoinContainer>
    </>
  );
});

export default Join;
