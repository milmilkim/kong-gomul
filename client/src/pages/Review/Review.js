import React from "react";

import BooksItem from "../../components/BooksItem";

import styled from "styled-components";

import axios from "../../config/axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

import ProfileImage from "../../components/ProfileImage";
import { FaStar } from "react-icons/fa";

const ReviewContainer = styled.div`
  padding: 20px;
  font-size: 14px;
  margin: auto;
  width: 1120px;
  background-color: #f6f6f6;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  min-height: 300px;

  .book-meta {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .book-thumb {
      width: 70px;
      height: 100px;
    }
    .book-info {
      width: 300px;
      h3 {
        font-size: 1.3rem;
        font-weight: bolder;
      }
    }
  }

  p {
    margin: 20px 0;
    white-space: pre-line;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .writer {
    .profile {
      display: flex;
      align-items: center;
      font-weight: bolder;
      padding-bottom: 10px;
      border-bottom: solid 1px ${(props) => props.theme.color.borderColor};
      margin-bottom: 20px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin-right: 5px;
      }

      .rating {
        margin-left: auto;
        background-color: #fff;
        padding: 5px 10px;
        display: flex;
        border-radius: 15px;
      }
    }
  }
`;

const Review = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  console.log(id);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("api/review/" + id);
        setData(res.data[0]);
      } catch (e) {
        console.erorr(e);
        Swal.fire(e.response.data.message);
      }
    })();
  }, [id]);
  return (
    <ReviewContainer>
      {data && (
        <>
          <div className="book-meta">
            <div className="book-info">
              <h3>{data.book.title}</h3>
            </div>
            <div className="book-thumb">
              <BooksItem
                book={data.book}
                itemWidth={"100%"}
                itemHeight={"auto"}
                itemHref={"/bookinfo/" + data.book.id}
              />
            </div>
          </div>
          <div className="writer">
            <Link to={`/member/${data.member.id}`}>
              <div className="profile">
                <ProfileImage src={data.member.profile_image} alt={data.member.nickname} />
                <div>
                  {data.member.nickname.length > 10 ? data.member.nickname.substr(0, 10) + "..." : data.member.nickname}
                </div>
                {data.rating && (
                  <div className="rating">
                    <FaStar />
                    {data.rating}점
                  </div>
                )}
              </div>
            </Link>
          </div>
          <div className="contents">
            <p>{data?.contents}</p>
          </div>
        </>
      )}
    </ReviewContainer>
  );
};

export default Review;
