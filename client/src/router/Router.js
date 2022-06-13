import { Routes, Route } from "react-router-dom";

import Test from "../pages/Test";

import Main from "../pages/Main";
import Join from "../pages/Join";
import Withdrawal from "../pages/Withdrawal";

import NotFound from "../pages/NotFound";

import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />
          <Route path="widthdrawal" element={<Withdrawal />} />
        </Route>
        {/*레이아웃이 적용되지 않는 페이지*/}
        <Route path="/join" element={<Join />} />
        {/* 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
