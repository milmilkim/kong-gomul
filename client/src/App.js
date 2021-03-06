import Router from "./router/Router.js";

import { ThemeProvider } from "styled-components";
import theme from "./theme.js";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tokenVerify, setIsLogin } from "./slices/AuthSlice";

/**
 * 앱이 실행될 때마다 토큰 유효성 검사를 한다
 */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      try {
        dispatch(tokenVerify());
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(setIsLogin(false));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
