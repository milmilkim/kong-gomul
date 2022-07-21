import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import RegexHelper from "../components/Regex/RegexHelper";
import styled from "styled-components";

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
  const form = useRef();
  const id = useRef(false);
  const email = useRef(false);
  const pw = useRef(false);
  const pwCheck = useRef(false);
  const birth = useRef(false);
  const sex = useRef(false);

  // 유효성 검사 메시지 출력
  const [idMessage, setIdMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [pwMessage, setPwMessage] = useState(false);
  const [birthSexMessage, setBirthSexMessage] = useState(false);
  const [termMessage, setTermMessage] = useState(false);

  const submitForm = useCallback((e) => {
    e.preventDefault();

    try {
      // 유효성 검사
      RegexHelper.value(id.current, "아이디를 입력해주세요.");
      RegexHelper.maxLength(id.current, 20, "아이디는 20자 이내로 입력해주세요.");
      RegexHelper.engNum(id.current, "아이디는 영문, 숫자로만 입력해주세요.");
      RegexHelper.value(email.current, "이메일을 입력해주세요.");
      RegexHelper.email(email.current, "이메일 형식에 맞게 입력해주세요.");
      RegexHelper.value(pw.current, "비밀번호를 입력해주세요.");
      RegexHelper.compareTo(pw.current, pwCheck.current, "비밀번호가 일치하지 않습니다.");
      if (birth.current !== "") {
        RegexHelper.value(birth.current, "출생년도를 입력해주세요.");
        RegexHelper.minLength(birth.current, 4, "출생년도 4자리를 입력해주세요.");
        RegexHelper.maxLength(birth.current, 4, "출생년도 4자리를 입력해주세요.");
      }
      RegexHelper.value(sex.current, "성별을 입력해주세요.");
      setBirthSexMessage("");
    } catch (e) {
      if (e.field === id.current) {
        setIdMessage(e.message);
        e.field.focus();
      } else {
        setIdMessage("");
      }
      if (e.field === email.current) {
        setEmailMessage(e.message);
        e.field.focus();
      } else {
        setEmailMessage("");
      }
      if (e.field === pw.current) {
        setPwMessage(e.message);
        e.field.focus();
      } else {
        setPwMessage("");
      }
      if (e.field === birth.current) {
        setBirthSexMessage(e.message);
        e.field.focus();
      } else {
        setBirthSexMessage("");
      }
    }
    form.submit();
  });

  return (
    <JoinContainer>
      <div className="inner">
        <form onSubmit={submitForm} ref={form}>
          <h2>회원가입</h2>
          <p>필수 입력</p>
          <div className="form-container">
            {/* 아이디 입력 */}
            <input type="text" placeholder="아이디" ref={id} />
            <span className="alertMsg">{idMessage}</span>
            {/* 이메일 입력 */}
            <input type="text" placeholder="이메일" ref={email} onBlur={(e) => console.log(RegexHelper)} />
            <span className="alertMsg">{emailMessage}</span>
            <button
              type="button"
              className="email-btn"
              onClick={(e) => {
                console.log("test");
              }}
            >
              이메일 인증
            </button>
            {/* 이메일 인증 코드 */}
            <input type="text" placeholder="이메일 인증 코드" />
          </div>

          <div className="form-container">
            {/* 비밀번호 */}
            <input type="password" placeholder="비밀번호" ref={pw} />
            {/* 비밀번호 확인 */}
            <input type="password" placeholder="비밀번호 확인" ref={pwCheck} />
            <span className="alertMsg">{pwMessage}</span>
          </div>

          <p>선택 입력</p>
          <div className="form-container">
            <div className="flex-row">
              {/* 출생년도 */}
              <input type="number" placeholder="출생년도 네 자리" ref={birth} />
              {/* 성별 */}
              <select ref={sex}>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <span className="alertMsg">{birthSexMessage}</span>
          </div>

          {/* 개인정보 약관 */}
          <div className="form-container term-container">
            <input type="text" value="여기에 약관" className="terms-infobox" />
            <input type="checkbox" id="personal" value="" />
            <label htmlFor="personal">개인정보 수집 및 이용 동의(필수)</label>
            {/* 약관 */}
            <input type="text" value="여기에 약관" className="terms-infobox" />
            <input type="checkbox" id="birthdate" value="" />
            <label htmlFor="birthdate">성별, 생년 정보 제공 동의(선택)</label>
            <span className="alertMsg">{termMessage}</span>
          </div>

          {/* 가입버튼 */}
          <button type="submit" className="submit-btn">
            회원가입
          </button>
        </form>
      </div>
    </JoinContainer>
  );
});

export default Join;
