import { Routes, Route } from "react-router-dom";

import Test from "../pages/Test";

import Main from "../pages/Main";
import Join from "../pages/Join";
import Withdrawal from "../pages/Withdrawal";

/* 내 서재 페이지 */
import Library from "../pages/Library/Library";
import LibraryAll from "../pages/Library/LibraryAll";
import LibraryRatings from "../pages/Library/LibraryRatings";
import LibraryRatingsMore from "../pages/Library/LibraryRatingsMore";
import LibraryWishes from "../pages/Library/LibraryWishes";

/* 검색 페이지 */
import Search from "../pages/Search/Search";
import SearchBooks from "../pages/Search/SearchBooks";
import SearchUsers from "../pages/Search/SearchUsers";

/* 카테고리 페이지 */
import CategoryGenres from "../pages/Category/CategoryGenres";

import NotFound from "../pages/NotFound";

import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />

          {/* 내 서재 페이지 */}
          <Route path="/library" element={<Library />}>
            <Route index element={<LibraryAll />}></Route>
            <Route path="ratings">
              <Route index element={<LibraryRatings />} />
              <Route path=":rating" element={<LibraryRatingsMore />} />
            </Route>
            <Route path="wishes" element={<LibraryWishes />} />
          </Route>

          {/* 검색 페이지 */}
          <Route path="/search">
            <Route index element={<Search />} />
            <Route path="books" element={<SearchBooks />} />
            <Route path="users" element={<SearchUsers />} />
          </Route>

          {/* 카테고리 페이지 */}
          <Route path="/category">
            <Route path="genres" element={<CategoryGenres />} />
          </Route>

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
