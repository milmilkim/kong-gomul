import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Meta from "./Meta";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Scroll from "./components/Scroll";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Meta />
      <GlobalStyles />
      <BrowserRouter>
        <Scroll />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
