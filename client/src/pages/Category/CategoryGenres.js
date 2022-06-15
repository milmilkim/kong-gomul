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

/* Swiper 컴포넌트 */
const CategorySwiper = ({ title, prevRef, nextRef, data, clsName }) => {
  return (
    <>
      <h5 className="categoryGenreTitle">#{title}</h5>
      <div className="swiperContainer">
        <Swiper
          slidesPerView={5}
          navigation={{
            clickable: true,
            nextEl: `.${clsName}-button-next`,
            prevEl: `.${clsName}-button-prev`,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
        >
          {/* 책 리스트 */}
          {data &&
            data.map((book, index) => (
              <SwiperSlide key={index}>
                <BooksItem book={book} itemWidth="100%" />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* prev btn */}
        <div className={`swiper-button-prev .${clsName}-button-prev`} ref={prevRef}>
          <FaAngleLeft />
          <span>Prev</span>
        </div>

        {/* next btn */}
        <div className={`swiper-button-next .${clsName}-button-next`} ref={nextRef}>
          <span>Next</span>
          <FaAngleRight />
        </div>
      </div>
    </>
  );
};

const CategoryGenres = memo(() => {
  const [comicBookData, setcomicBookData] = useState(null);
  const [romanceBookData, setRomanceBookData] = useState(null);
  const [fantasyBookData, setFantasyBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBookList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "만화 e북",
        },
      });
      const res2 = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "로판 e북",
        },
      });
      const res3 = await axios.get("http://localhost:3001/api/book", {
        params: {
          category: "판타지 웹소설",
        },
      });

      setcomicBookData(res.data);
      setRomanceBookData(res2.data);
      setFantasyBookData(res3.data);
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
  const comicPrevRef = useRef(null);
  const comicNextRef = useRef(null);
  const romancePrevRef = useRef(null);
  const romanceNextRef = useRef(null);
  const fantasyPrevRef = useRef(null);
  const fantasyNextRef = useRef(null);

  return (
    <>
      {/* Spinner */}
      <Spinner visible={isLoading} />

      <CategoryGenreContainer>
        {/* 만화 */}
        <CategorySwiper
          title="만화"
          clsName="comic"
          prevRef={comicPrevRef}
          nextRef={comicNextRef}
          data={comicBookData}
        />

        {/* 로맨스 */}
        <CategorySwiper
          title="로맨스"
          clsName="romance"
          prevRef={romancePrevRef}
          nextRef={romanceNextRef}
          data={romanceBookData}
        />

        {/* 판타지 */}
        <CategorySwiper
          title="판타지"
          clsName="fantasy"
          prevRef={fantasyPrevRef}
          nextRef={fantasyNextRef}
          data={fantasyBookData}
        />
      </CategoryGenreContainer>
    </>
  );
});

export default CategoryGenres;
