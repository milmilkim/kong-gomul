/**
 * 카테고리 장르별 서적 페이지
 */
import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

/* Slice */
import { getBookList } from "../slices/BookListSlice";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

/* Components */
import BooksItem from "../components/BooksItem";
import Spinner from "../components/spinner";
import { getRecoBookList } from "../slices/RecommendationSlice";

import { FaStar } from "react-icons/fa";

/* Styled Components */
const CategoryGenreContainer = styled.div`
  min-height: 100vh;
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

    h2 {
      font-size: 1.2rem;
      font-weight: bolder;
    }

    p {
      line-height: 1.5;

      svg {
        vertical-align: top;
        color: ${(props) => props.theme.color.primaryColor};
      }
    }
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
const CategorySwiper = ({ title, data, clsName, children }) => {
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
            data.map((book) => (
              <SwiperSlide key={book.id}>
                <BooksItem book={book} title={book.title} itemHref={`/bookinfo/${book.id}`} itemWidth="100%">
                  <h2>{book.title}</h2>
                  {book.expected_rating ? (
                    <p>
                      예상 별점 <FaStar /> {book.expected_rating.toFixed(1)}
                    </p>
                  ) : (
                    <p>
                      평균 별점 <FaStar /> {book.avg_rating ? book.avg_rating.toFixed(1) : 0}
                    </p>
                  )}
                </BooksItem>
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
  const { data: reco, loading } = useSelector((state) => state.recommendation);
  const { isLogin, id, info } = useSelector((state) => state.auth);

  const [bookData, setBookData] = useState({});

  const category = ["만화 e북", "로판 e북", "판타지 웹소설"];

  const fetchData = async (category) => {
    const {
      payload: { data },
    } = await dispatch(
      getBookList({
        category,
        sort: "count",
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
        {category.map((v) => {
          return bookData[v] && <CategorySwiper title={v} clsName="test" data={bookData[v]} />;
        })}
      </CategoryGenreContainer>
    </>
  );
});

export default CategoryGenres;
