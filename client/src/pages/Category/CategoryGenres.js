/**
 * 카테고리 장르별 서적 페이지
 */
import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import axios from "axios";

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
      background-color: #4cd137;
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

const CategoryGenres = memo(() => {
  const [romanceBookData, setRomanceBookData] = useState(null);
  const [fantasyBookData, setFantasyBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBookList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "로판 e북",
        },
      });
      const res2 = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "판타지 웹소설",
        },
      });

      setRomanceBookData(res.data);
      setFantasyBookData(res2.data);
    } catch (e) {
      console.error(e);
    } finally {
      // ajax 로딩 종료
      setIsLoading(false);
    }
  };

  // 페이지가 열렸을 때,
  useEffect(() => {
    // 로딩 시작을 하고
    setIsLoading(true);

    // axios 요청을 한다.
    getBookList();
  }, []);

  /* prev, next button ref */
  const romancePrevRef = useRef(null);
  const romanceNextRef = useRef(null);
  const fantasyPrevRef = useRef(null);
  const fantasyNextRef = useRef(null);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={isLoading} />

      <CategoryGenreContainer>
        {/* 로맨스 */}
        <h5 className="categoryGenreTitle">#로맨스</h5>
        <div className="swiperContainer">
          <Swiper
            className="genreSwiper"
            slidesPerView={5}
            navigation={{
              clickable: true,
              nextEl: ".genreSwiper-button-next",
              prevEl: ".genreSwiper-button-prev",
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = romancePrevRef.current;
              swiper.params.navigation.nextEl = romanceNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            modules={[Navigation]}
          >
            {/* 로맨스 책 리스트 */}
            {romanceBookData &&
              romanceBookData.map((book, index) => (
                <SwiperSlide key={index}>
                  <BooksItem book={book} itemWidth="100%" />
                </SwiperSlide>
              ))}
          </Swiper>

          {/* prev btn */}
          <div className="genreSwiper-button-prev swiper-button-prev" ref={romancePrevRef}>
            <FaAngleLeft />
            <span>Prev</span>
          </div>

          {/* next btn */}
          <div className="genreSwiper-button-next swiper-button-next" ref={romanceNextRef}>
            <span>Next</span>
            <FaAngleRight />
          </div>
        </div>

        {/* 판타지 */}
        <h5 className="categoryGenreTitle">#판타지</h5>
        <div className="swiperContainer">
          <Swiper
            className="fantasySwiper"
            slidesPerView={5}
            navigation={{
              clickable: true,
              nextEl: ".fantasySwiper-button-next",
              prevEl: ".fantasySwiper-button-prev",
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = fantasyPrevRef.current;
              swiper.params.navigation.nextEl = fantasyNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            modules={[Navigation]}
          >
            {/* 판타지 책 리스트 */}
            {fantasyBookData &&
              fantasyBookData.map((book, index) => (
                <SwiperSlide key={index}>
                  <BooksItem book={book} itemWidth="100%" />
                </SwiperSlide>
              ))}
          </Swiper>

          {/* prev btn */}
          <div className="fantasySwiper-button-prev swiper-button-prev" ref={fantasyPrevRef}>
            <FaAngleLeft />
            <span>Prev</span>
          </div>

          {/* next btn */}
          <div className="fantasySwiper-button-next swiper-button-next" ref={fantasyNextRef}>
            <span>Next</span>
            <FaAngleRight />
          </div>
        </div>
      </CategoryGenreContainer>
    </>
  );
});

export default CategoryGenres;
