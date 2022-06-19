import React, { memo } from "react";
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

    .alert-text {
    }
  }
`;

const Join = memo(() => {
  // const maxLength = RegexHelper.maxLength();

  return (
    <JoinContainer>
      <div className="inner">
        <form>
          <h2>회원가입</h2>
          <p>필수 입력</p>
          <div className="form-container">
            {/* 아이디 입력 */}
            <input type="text" placeholder="아이디" required onBlur={(e) => console.log("test")} />
            {/* 이메일 입력 */}
            <input type="email" placeholder="이메일" required onBlur={(e) => console.log("test")} />
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
            <input type="password" placeholder="비밀번호" />
            {/* 비밀번호 확인 */}
            <input type="password" placeholder="비밀번호 확인" />
          </div>

          <p>선택 입력</p>
          <div className="form-container flex-row">
            {/* 출생연도 */}
            <input type="number" placeholder="출생연도 네 자리" />
            {/* 성별 */}
            <input type="text" placeholder="성별" />
          </div>

          {/* 개인정보 약관 */}
          <div classname="form-container term-container">
            <input type="text" value="여기에 약관" className="terms-infobox" />
            <input type="checkbox" id="personal" value="" required />
            <label for="personal">개인정보 수집 및 이용 동의(필수)</label>
            {/* 약관 */}
            <input type="text" value="여기에 약관" className="terms-infobox" />
            <input type="checkbox" id="birthdate" value="" />
            <label for="birthdate">성별, 생년 정보 제공 동의(선택)</label>
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
