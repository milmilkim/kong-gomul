import Router from "./router/Router.js";

import { ThemeProvider } from "styled-components";
import theme from "./theme.js";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tokenVerify } from "./slices/AuthSlice";

/**
 * 앱이 실행될 때마다 토큰 유효성 검사를 한다
 */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      dispatch(tokenVerify());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
