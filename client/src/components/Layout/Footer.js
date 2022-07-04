import React, { memo } from "react";

import styled from "styled-components";

const HeaderContainer = styled.footer`
  font-size: 12px;
  padding: 15px 0;
  border-top: 1px solid ${(props) => props.theme.color.borderColor};

  strong {
    font-weight: bold;
  }

  p {
    margin-bottom: 5px;
  }

  .flex-row {
    padding: 15px 0;
    justify-content: space-between;
    align-items: center;
  }
`;

const Footer = memo(() => {
  return (
    <HeaderContainer>
      <div className="inner">
        <div className="flex-row">
          <div>
            <p>
              <a href="/">
                <strong>개인정보 처리방침</strong>
              </a>
            </p>
            <p>
              버그 신고 및 기타 문의 <a href="/">misoriu@gmail.com</a>
            </p>
            <p>본 사이트는 영리목적 없이 개인 프로젝트의 일환으로 제작되었습니다.</p>
          </div>
          <div>
            <ul>
              <li>
                <a href="/">깃허브</a>
              </li>
              <li>
                <a href="/">포폴링크</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
});

export default Footer;
