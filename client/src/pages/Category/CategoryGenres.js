/**
 * 카테고리 장르별 서적 페이지
 */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getBookList } from "../../slices/BookListSlice";

/* Swiper */
import "swiper/css";
import "swiper/css/navigation";

/* Components */
import Spinner from "../../components/spinner";
import CategoryGenreContainer from "../../components/Category/CategoryGenresContainer";
import CategorySwiper from "../../components/Category/CategorySwiper";

const CategoryGenres = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.booklist); // 로딩여부

  const [comicBookData, setcomicBookData] = useState(null);
  const [romanceBookData, setRomanceBookData] = useState(null);
  const [fantasyBookData, setFantasyBookData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const {
        payload: { data: comicData },
      } = await dispatch(
        getBookList({
          category: "만화 e북",
        })
      );

      const {
        payload: { data: romanceData },
      } = await dispatch(
        getBookList({
          category: "로판 e북",
        })
      );

      const {
        payload: { data: fantasyData },
      } = await dispatch(
        getBookList({
          category: "판타지 웹소설",
        })
      );

      setcomicBookData(comicData);
      setRomanceBookData(romanceData);
      setFantasyBookData(fantasyData);
    }

    fetchData();
  }, [dispatch]);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={loading} />

      <CategoryGenreContainer>
        {/* 만화 */}
        {comicBookData && <CategorySwiper title="만화" clsName="comic" data={comicBookData} />}
        {/* 로맨스 */}
        {romanceBookData && <CategorySwiper title="로맨스" clsName="romance" data={romanceBookData} />}
        {/* 판타지 */}
        {fantasyBookData && <CategorySwiper title="판타지" clsName="fantasy" data={fantasyBookData} />}
      </CategoryGenreContainer>
    </>
  );
});

export default CategoryGenres;
