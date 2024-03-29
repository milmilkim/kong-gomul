import { useState, useCallback } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import ReviewItem from "../../components/Review/ReviewItem";
import { useEffect } from "react";
import axios from "../../config/axios";
import Spinner from "../../components/spinner";

import { useInView } from "react-intersection-observer";

const ReviewListContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;

  .page-inner {
    width: 640px;
    margin: 0 auto;

    h2 {
      span {
        font-weight: bolder;
        font-size: 1.2rem;
      }
      margin-bottom: 20px;
    }
  }
`;

const ReviewList = () => {
  const { id } = useParams();
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [ref, inView] = useInView({
    threshold: 1,
  });

  const size = 4;

  const getData = useCallback(
    async (p) => {
      setIsLoading(true);
      const res = await axios.get("api/book/review/" + id, {
        params: {
          page: p || 1,
          size,
        },
      });
      setReviewList(res.data);
      setTotal(res.headers["total-count"]);
      setIsLoading(false);
    },
    [id]
  );

  const moreData = useCallback(
    async (p) => {
      if (p > Math.ceil(total / size)) {
        return;
      }
      setIsLoading(true);
      const res = await axios.get("api/book/review/" + id, {
        params: {
          page: p || 1,
          size,
        },
      });
      setIsLoading(false);

      setReviewList((reviewList) => reviewList.concat(res.data));
      setPage((page) => page + 1);
    },
    [id, total]
  );

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (inView && !isLoading) {
      moreData(page + 1);
    }
  }, [inView, page, isLoading, moreData, reviewList.length]);

  return (
    <ReviewListContainer>
      <Spinner visible={isLoading} />
      <div className="page-inner">
        <h2>
          <span>리뷰</span> + {total}
        </h2>
        {reviewList &&
          reviewList.map((review, i) => (
            <ReviewItem key={i} data={review} {...(!isLoading && reviewList.length - 1 === i ? { inview: ref } : {})} />
          ))}
      </div>
    </ReviewListContainer>
  );
};

export default ReviewList;
