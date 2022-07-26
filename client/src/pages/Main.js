/**
 * 카테고리 장르별 서적 페이지
 */
import React, { memo, useEffect, useState } from "react";
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

  const category = ["만화 e북", "로판 e북", "판타지 웹소설"];

  const fetchData = async (category) => {
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
  };
  useEffect(() => {
    if (isLogin) {
      dispatch(getRecoBookList());
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    category.forEach((v) => {
      fetchData(v);
    });
  }, [dispatch]);

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
        {category.map((v, i) => {
          return bookData[v] && <CategorySwiper key={i} title={v} clsName="test" data={bookData[v]} />;
        })}
      </CategoryGenreContainer>
    </>
  );
});

export default CategoryGenres;
