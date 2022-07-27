/**
 * 카테고리 장르별 서적 페이지
 */
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getBookList } from "../slices/BookListSlice";

/* Swiper */
import CategorySwiper from "../components/Category/CategorySwiper";

/* Components */
import Spinner from "../components/spinner";
import CategoryGenreContainer from "../components/Category/CategoryGenresContainer";
import { getRecoBookList } from "../slices/RecommendationSlice";

const CategoryGenres = memo(() => {
  const dispatch = useDispatch();
  const { data: reco, loading } = useSelector((state) => state.recommendation);
  const { isLogin, info } = useSelector((state) => state.auth);

  const [bookData, setBookData] = useState({});

  const fetchData = useCallback(
    async (category) => {
      const {
        payload: { data },
      } = await dispatch(
        getBookList({
          category,
          sort: "random",
        })
      );
      setBookData((bookData) => {
        return { ...bookData, [category]: data };
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (isLogin) {
      dispatch(getRecoBookList());
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    const category = ["만화 e북", "로판 e북", "판타지 웹소설"];

    category.forEach((category) => {
      fetchData(category);
    });
  }, [fetchData]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <CategoryGenreContainer>
        {isLogin && reco && reco.length > 0 && (
          <CategorySwiper
            title={` ${info.nickname} 님만을 위한 맞춤 추천!`}
            clsName="recommendations"
            data={reco}
          ></CategorySwiper>
        )}
        {bookData["만화 e북"] && <CategorySwiper title={"만화 e북"} clsName="comic" data={bookData["만화 e북"]} />}
        {bookData["로판 e북"] && <CategorySwiper title={"로판 e북"} clsName="romance" data={bookData["로판 e북"]} />}
        {bookData["판타지 웹소설"] && (
          <CategorySwiper title={"판타지 웹소설"} clsName="fantasy" data={bookData["판타지 웹소설"]} />
        )}
      </CategoryGenreContainer>
    </>
  );
});

export default CategoryGenres;
