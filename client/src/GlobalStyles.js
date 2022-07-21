import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
  font-family: 'NanumBarunGothic';
  font-style: normal;
  font-weight: 400;
  src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
  src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf') format('truetype');
  }

  body {
    word-break: keep-all;
    font-family: 'NanumBarunGothic'
  }

  input {
    font-family: 'NanumBarunGothic' ;
  }

  textarea {
    font-family: 'NanumBarunGothic' ;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul, li {
    list-style: none;
    padding-left: 0;
  }

  .inner {
    min-width: 560px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .flex-row {
    display: flex;
  }

  .blind-text {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
  }

  svg {
    vertical-align: middle;
  }
`;

export default GlobalStyles;
