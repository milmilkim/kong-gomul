import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .inner {
    min-width: 560px;
    max-width: 935px;
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
`;

export default GlobalStyles;
