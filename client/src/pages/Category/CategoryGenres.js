/**
 * 카테고리 장르별 서적 페이지
 */
import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getBookList } from "../../slices/BookListSlice";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

/* Components */
import BooksItem from "../../components/BooksItem";
import Spinner from "../../components/spinner";

/* Styled Components */
const CategoryGenreContainer = styled.div`
  width: 1200px;
  margin: 0 auto;

  .categoryGenreTitle {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }

  .swiperContainer {
    position: relative;

    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: 45%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 50px;
      background-color: ${(props) => props.theme.color.primaryColor};
      color: #fff;
      border-radius: 100px;
      z-index: 9999;
    }

    .swiper-button-next {
      right: -50px;
    }
    .swiper-button-prev {
      left: -50px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      display: none;
    }
  }
`;

/* Swiper 컴포넌트 */
const CategorySwiper = ({ title, data, clsName }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <h5 className="categoryGenreTitle">#{title}</h5>
      <div className="swiperContainer">
        <Swiper
          slidesPerView={5}
          navigation={{
            prevEl: prevRef.current ? prevRef.current : undefined,
            nextEl: nextRef.current ? nextRef.current : undefined,
          }}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
        >
          {/* 책 리스트 */}
          {data &&
            data.map((book, index) => (
              <SwiperSlide key={index}>
                <BooksItem book={book} itemHref={`/bookinfo/${book.id}`} itemWidth="100%" />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* prev btn */}
        <div className={`swiper-button-prev ${clsName}-button-prev`} ref={prevRef}>
          <FaAngleLeft />
          <span>Prev</span>
        </div>

        {/* next btn */}
        <div className={`swiper-button-next ${clsName}-button-next`} ref={nextRef}>
          <span>Next</span>
          <FaAngleRight />
        </div>
      </div>
    </>
  );
};

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
