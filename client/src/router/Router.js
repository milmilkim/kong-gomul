import { Routes, Route } from "react-router-dom";

import Test from "../pages/TestImageUpload";
import Main from "../pages/Main";
import Join from "../pages/Join";
import Withdrawal from "../pages/Withdrawal";

import Oauth from "../pages/Oauth";

/* 마이페이지 */
import MyPage from "../pages/Personal/MyPage";

/* 멤버 프로필 */
import MemberProfile from "../pages/Personal/MemberProfile";

/* 멤버 보고싶어요 페이지 */
import MemberLibraryWishes from "../pages/Personal/MemberLibraryWishes";

/* 멤버 서재 페이지 */
import MemberLibraryAll from "../pages/Personal/MemberLibraryAll";
import MemberLibraryRatings from "../pages/Personal/MemberLibraryRatings";
import MemberLibraryRatingsMore from "../pages/Personal/MemberLibraryRatingsMore";

/* 취향 분석 */
import Analysis from "../pages/Personal/Analysis";

/* 책 상세페이지 */
import BookInfo from "../pages/Book/BookInfo";
import Review from "../pages/Book/Review";

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
import CategoryRomance from "../pages/Category/CategoryRomance";
import CategoryComic from "../pages/Category/CategoryComic";
import CategoryFantasy from "../pages/Category/CategoryFantasy";

import NotFound from "../pages/NotFound";

import Layout from "../components/Layout/Layout";
import Category from "../pages/Category/Category";
import ReviewList from "../pages/Book/ReviewList";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/*메인 */}
          <Route path="/" element={<CategoryGenres />} />
          {/*테스트용 페이지 */}
          <Route path="/test" element={<Test />} />
          {/* OAuth */}
          <Route path="/oauth" element={<Oauth />} />
          {/*회원 가입 */}
          <Route path="/join" element={<Join />} />
          {/*회원 탈퇴 */}
          <Route path="/withdrawal" element={<Withdrawal />} />

          {/*마이 페이지 */}
          <Route path="/mypage">
            <Route index element={<MyPage />}></Route>
          </Route>

          {/*멤버 프로필*/}
          <Route path="/member/:id">
            <Route index element={<MemberProfile />} />
            <Route element={<Library />}>
              {/* 멤버 보고싶어요 페이지 */}
              <Route path="wishes" element={<MemberLibraryWishes />} />
              {/* 멤버 서재 페이지 */}
              <Route path="library">
                <Route index element={<MemberLibraryAll />} />
                <Route path="ratings">
                  <Route index element={<MemberLibraryRatings />} />
                  <Route path=":rating" element={<MemberLibraryRatingsMore />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="/member/:id/analysis" element={<Analysis />} />

          {/*책 상세페이지 */}
          <Route path="/bookinfo/:id" element={<BookInfo />} />
          {/*리뷰 상세페이지 */}
          <Route path="/review" element={<Review />} />
          {/*리뷰 목록페이지 */}
          <Route path="/reviewlist" element={<ReviewList />} />

          {/* 내 서재 페이지 */}
          <Route path="/library" element={<Library />}>
            <Route index element={<LibraryAll />} />
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
            <Route index element={<Category />} />
            <Route path="romance" element={<CategoryRomance />} />
            <Route path="comic" element={<CategoryComic />} />
            <Route path="fantasy" element={<CategoryFantasy />} />
          </Route>
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
