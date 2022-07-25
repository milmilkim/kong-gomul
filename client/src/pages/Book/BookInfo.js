/* 기본 설정 */
import React, { useEffect, useState, useCallback } from "react";
import axios from "../../config/axios";
import { Link, useParams } from "react-router-dom";

/*컴포넌트 */
import BooksThumb from "../../components/BooksThumb";
import ReviewThumb from "../../components/ReviewThumb";
import ReviewWrite from "../../components/ReviewWrite";
import Spinner from "../../components/spinner";
import Star from "../../components/Star";
import Meta from "../../Meta";
import MyReview from "../../components/Review/MyReview";
import ResultNotFound from "../../components/ResultNotFound";

/*리덕스 */
import { useDispatch, useSelector } from "react-redux";
import { getBookInfo } from "../../slices/BookInfoSlice";
import { getReviewListByBookId } from "../../slices/ReviewSlice";
import { addWishList, deleteWishList, getWishList } from "../../slices/WishSlice";

/* 기타등등 */
import { FaPlus, FaBookmark } from "react-icons/fa";
import Swal from "sweetalert2";
import styled from "styled-components";
import { FaStar, FaPenFancy } from "react-icons/fa";

const BookInfo = () => {
  //모달
  const [isOpen, setIsOpen] = useState(false);
  //책 아이디
  const { id } = useParams();

  /** 리덕스 관련 */
  const dispatch = useDispatch();
  //책 정보
  const { data, loading, colors, error } = useSelector((state) => state.bookInfo);
  //하단에 표시될 리뷰
  const { data: reviewData, loading: loading2 } = useSelector((state) => state.review);
  const { isLogin, id: member_id } = useSelector((state) => state.auth);
  //보고싶어요
  const { data: wishList } = useSelector((state) => state.wish);

  //보고싶어요 추가되어있는지
  const [isAdded, setIsAdded] = useState(false);

  /**클릭 이벤트 **/

  //모달
  const handleButton = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };

  //보고싶어요 추가
  const moveToWishList = useCallback(
    (e) => {
      if (isAdded) {
        //삭제
        dispatch(deleteWishList(id));
      } else {
        //추가
        dispatch(
          addWishList({
            book_id: id,
          })
        );
      }

      setIsAdded((isAdded) => !isAdded);
    },
    [isAdded, dispatch]
  );

  //평점 state
  const [rating, setRating] = useState(null);
  //기존 리뷰 state
  const [myReview, setMyReview] = useState({ contents: "", is_spoiler: false, loaded: false, member: null });
  //평점 onChange
  const onStarChange = async (value) => {
    try {
      const res = await axios.post(`api/review/${id}`, { rating: value });
    } catch (err) {
      Swal.fire("err.message");
    }
    setRating(value);
  };

  /** useEffect */

  //책 밑에 출력할 리뷰 4개 불러오기
  useEffect(() => {
    dispatch(getBookInfo({ id }));
    dispatch(getReviewListByBookId({ id, size: 4 }));
  }, [dispatch, id]);

  //보고싶어요 체크 여부 확인을 위한 위시리스트 조회
  useEffect(() => {
    if (isLogin) {
      dispatch(getWishList());
    }
  }, [isLogin, dispatch]);

  //보고싶어요 체크 여부
  useEffect(() => {
    if (wishList) {
      wishList.forEach((element) => {
        if (element.book_id === Number(id)) {
          setIsAdded(true);
        }
      });
    }
  }, [wishList]);

  //내 기존 리뷰 불러오기
  useEffect(() => {
    (async () => {
      let res = null;

      //로그인 했을 때만 불러옴
      if (isLogin) {
        try {
          res = await axios.get(`api/book/review/${id}`, {
            params: {
              member_id,
            },
          });

          // 별점을 설정하고 없으면 null
          setRating(res.data[0] ? res.data[0].rating : null);
          setMyReview({ ...myReview, ...res.data[0], loaded: true });
        } catch (err) {
          console.error(err.message);
        }
      }
    })();
  }, [isLogin]);

  return (
    <BookInfoContainer>
      <Spinner visible={loading || loading2} />
      {error && (
        <ResultNotFound style={{ margin: "auto" }}>
          {error.code}:{error.message}
        </ResultNotFound>
      )}
      {data && (
        <>
          <StyledTop color={colors} thumbnail={data.thumbnail}></StyledTop>
          <div className="inner">
            <Meta title={`콩고물 - ${data.title}`} />

            <section className="flex-row">
              {/* 책 섬네일 */}
              <div className="book-thumb">
                <BooksThumb size={"big"} thumbnail={data.thumbnail} title={data.title} />
                {/* 보고싶어요 버튼 */}
                {isLogin &&
                  (isAdded ? (
                    <div className="wish active" onClick={moveToWishList}>
                      <FaBookmark />
                      보고싶어요
                    </div>
                  ) : (
                    <div className="wish" onClick={moveToWishList}>
                      <FaPlus />
                      보고싶어요
                    </div>
                  ))}
              </div>
              {/* 책 정보 */}
              <div className="infomation">
                <span>{data.category}</span>
                <span>{data?.genres?.map((v) => v.genre).join(", ")}</span>

                <h1 className="title">{data.title}</h1>
                <div className="meta">
                  <ul>
                    <li>{data.authors?.map((v) => v.name).join(", ")}</li>
                    <li>{data.publishers?.map((v) => v.name).join(", ")}</li>
                    <li className="rating">
                      평균
                      <FaStar /> {data.avg_rating ? data.avg_rating.toFixed(2) : 0} ({data.count_rating || 0})
                    </li>
                  </ul>
                </div>
                {/* 별점 */}
                {isLogin ? (
                  myReview.loaded && <Star rating={rating} onChange={onStarChange} />
                ) : (
                  <>로그인 후 별점을 기록해보세요!</>
                )}
                {/*리뷰 작성과 수정 버튼*/}
                {isLogin && (
                  <div className="add_review" onClick={handleButton}>
                    <FaPenFancy />
                    리뷰 작성/수정
                  </div>
                )}
              </div>
            </section>

            {/**내 리뷰 상단 표시 */}
            {isLogin && myReview.contents && <MyReview myReview={myReview} />}

            {/**책 소개 */}
            <section className="description">
              <h2>책 소개</h2>
              <p>{data.introduce}</p>

              <h2>키워드</h2>
              <p>
                {data.keywords?.map((v, i) => (
                  <span className="keyword" key={i}>
                    {v.keyword}
                  </span>
                ))}
              </p>
            </section>

            <section className="review">
              <button type="button" className="review-btn">
                더보기
              </button>

              <ReviewWrite
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                myReview={myReview}
                setMyReview={setMyReview}
                book_id={id}
              />
              <ul className="flex-row">
                {reviewData?.map((review) => (
                  <li key={review.id}>
                    <ReviewThumb review={review} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </BookInfoContainer>
  );
};

const BookInfoContainer = styled.div`
  font-size: 14px;
  background-color: #f8f8f8;
  min-width: 1400px;
  section {
    margin-bottom: 50px;
    width: 1000px;
    margin: auto;
    background-color: #fff;
    .wish {
      text-align: center;
      margin-top: 20px;
      cursor: pointer;
      width: 150px;
      height: 50px;
      margin: auto;
      margin-top: 20px;
      @keyframes sizeUp {
        from {
          font-size: 1rem;
        }
        to {
          font-size: 1.1rem;
        }
      }
      &.active {
        animation: sizeUp 300ms ease;
        animation-fill-mode: forwards;
        color: ${(props) => props.theme.color.primaryColor};
      }
    }
    &.flex-row {
      border-bottom: 1px solid #eee;
      margin-bottom: 30px;
      .book-thumb {
        /* width: 30%; */
        margin-top: -80px;
        z-index: 1;
        border: 1px solid #fff;
      }
      .infomation {
        padding-left: 60px;
        width: 100%;
        position: relative;
        line-height: 1.3;
        margin-top: 10px;
        flex-direction: column;
        display: flex;
        padding-bottom: 20px;
        padding-right: 40px;
        span {
          line-height: 1.4;
          color: #787878;
        }
        h1 {
          font-size: 2rem;
          font-weight: bolder;
          margin-top: 5px;
        }
        .add_review {
          margin-left: auto;
          cursor: pointer;
          transition: all 300ms ease;
          svg {
            margin-right: 10px;
          }
          &:hover {
            font-size: 1rem;
            color: ${(props) => props.theme.color.primaryColor};
          }
        }
        .meta {
          font-size: 1.2rem;
          color: #787878;
          margin-bottom: 20px;
          ul > li {
            &::after {
              content: " ・ ";
            }
          }
          ul li {
            float: left;
            margin-right: 5px;
          }
          li.rating {
            color: #66bfbf;
            svg {
              vertical-align: top;
            }
            &::after {
              content: "";
            }
          }
        }
      }
    }
    h2 {
      font-size: 1.3rem;
      font-weight: bolder;
    }
    &.review {
      position: relative;
      border: 1px solid #eee;
      padding: 10px;
      display: flex;
      flex-direction: column;
      ul.flex-row {
        overflow: hidden;
        li {
          width: 25%;
          padding: 10px;
        }
      }
      button.review-btn {
        appearance: none;
        outline: none;
        border: none;
        background-color: #333;
        color: #eee;
        cursor: pointer;
        padding: 5px 10px;
        margin-left: auto;
      }
    }
    &.description {
      margin-top: 30px;
      margin-bottom: 30px;
      padding: 20px;
      p {
        margin: 20px 0;
        white-space: pre-line;
        font-size: 1.1rem;
        line-height: 1.5;
        .keyword {
          display: inline-block;
          padding: 5px;
          background-color: #f2f2f2;
          border-radius: 5px;
          margin: 0 5px 10px 0;
          &::before {
            content: "#";
          }
        }
      }
    }
  }
`;

const StyledTop = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.color[0]};
`;

export default BookInfo;