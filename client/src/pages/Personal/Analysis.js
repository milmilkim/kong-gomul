import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAnalysis } from "../../slices/AnalysisSlice";

import { useEffect } from "react";

import ProfileImage from "../../components/ProfileImage";

import Section from "../../components/Analysis/Section";
import RatingChart from "../../components/Analysis/RatingChart";

import Spinner from "../../components/spinner";
import KeywordCloud from "../../components/Analysis/KeywordCloud";

const AnalysisContainer = styled.div`
  max-width: 640px;
  margin: auto;
  margin-top: 10px;

  header {
    background-color: #e01e53;
    height: 250px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    border-radius: 10px;

    h1 {
      font-size: 2.3rem;
      font-weight: bold;
      color: #fff;
    }

    .profile {
      color: #fff;
      display: flex;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
`;

const Analysis = () => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);
  const { data: analysis, loading, error } = useSelector((state) => state.analysis);

  useEffect(() => {
    dispatch(getAnalysis());
  }, [dispatch]);

  const data = [];
  let j = 0;
  for (let i = 0; i < 11; i++) {
    data.push({
      name: (j * 2) % 2 === 0 ? j : "",
      count: analysis?.rating?.count[j] || 0,
    });

    j += 0.5;
  }

  const words = [];
  analysis?.keyword.forEach((v) => {
    words.push({ text: Object.keys(v), value: v[Object.keys(v)] });
  });

  return (
    <AnalysisContainer>
      <Spinner visible={loading} />
      <header>
        <h1>취향 분석🎈</h1>
        {info && (
          <div className="profile">
            <ProfileImage src={info.profile_image} alt={info.nickname} />
            {info.nickname}
          </div>
        )}
      </header>

      {analysis && (
        <>
          <Section>
            <h2>평가수</h2>
            <ul>
              {analysis?.category?.map((v, i) => (
                <li key={i}>
                  <div className="title">{Object.keys(v)}</div>
                  <div className="sub">{v[Object.keys(v)]}</div>
                </li>
              ))}
            </ul>
          </Section>

          <Section>
            <h2>별점 분포</h2>
            <RatingChart data={data} />
            <ul>
              <li>
                <div className="title">{analysis?.rating?.avg}</div>
                <div className="sub">별점 평균</div>
              </li>
              <li>
                <div className="title">{analysis?.rating?.count_all}</div>
                <div className="sub">별점 개수</div>
              </li>
              <li>
                <div className="title">{analysis?.rating?.frequent}</div>
                <div className="sub">많이 준 별점</div>
              </li>
            </ul>
          </Section>

          <Section>
            <h2>선호 키워드</h2>
            <KeywordCloud words={words} />
            <h2>선호 장르</h2>
          </Section>
        </>
      )}
    </AnalysisContainer>
  );
};

export default Analysis;
