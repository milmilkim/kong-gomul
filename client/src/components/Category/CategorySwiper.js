import { useRef } from "react";

/* Swiper */
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import BooksItem from "../BooksItem";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";

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
            // prevEl: prevRef.current ? prevRef.current : undefined,
            // nextEl: nextRef.current ? nextRef.current : undefined,
            prevEl: `.${clsName}-button-prev`,
            nextEl: `.${clsName}-button-next`,
            clickable: true,
          }}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            // swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
        >
          {/* 책 리스트 */}
          {data &&
            data.map((book, index) => (
              <SwiperSlide key={index}>
                <BooksItem book={book} itemHref={`/bookinfo/${book.id}`} itemWidth="100%">
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

export default CategorySwiper;
