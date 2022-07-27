import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAnalysis, getMemberAnalysis } from "../../slices/AnalysisSlice";
import { getMyProfile, getMemberProfile } from "../../slices/MemberSlice";
import { useEffect } from "react";
import ProfileImage from "../../components/ProfileImage";
import Section from "../../components/Analysis/Section";
import ResultNotFound from "../../components/ResultNotFound";
import RatingChart from "../../components/Analysis/RatingChart";
import Spinner from "../../components/spinner";
import KeywordCloud from "../../components/Analysis/KeywordCloud";
import { useParams } from "react-router-dom";
import { shareTwitter } from "../../lib/Share";
import Meta from "../../Meta";
import { FaTwitter } from "react-icons/fa";

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

  .twitter {
    cursor: pointer;
    margin: 10px;
  }
`;

const Analysis = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: member } = useSelector((state) => state.member);
  const { data: analysis, loading } = useSelector((state) => state.analysis);

  useEffect(() => {
    if (id) {
      dispatch(getMemberProfile(id));
      dispatch(getMemberAnalysis(id));
    } else {
      dispatch(getMyProfile());
      dispatch(getAnalysis());
    }
  }, [dispatch, id]);

  //별점
  const data = [];
  let j = 0;
  for (let i = 0; i < 11; i++) {
    data.push({
      name: (j * 2) % 2 === 0 ? j : "",
      count: analysis?.rating?.count ? analysis?.rating?.count[j] : 0,
    });

    j += 0.5;
  }

  //키워드
  const words = [];
  analysis?.keyword.forEach((v) => {
    words.push({ text: Object.keys(v), value: v[Object.keys(v)] });
  });

  return (
    <AnalysisContainer>
      <Spinner visible={loading} />
      {member ? (
        <header>
          <Meta title={`콩고물이 분석한 ${member.nickname} 님의 취향은?`}></Meta>

          <h1>취향 분석🎈</h1>
          <div className="profile">
            <ProfileImage src={member.profile_image} alt={member.nickname} />
            {member.nickname}
          </div>
        </header>
      ) : (
        <ResultNotFound>잘못된 요청입니다</ResultNotFound>
      )}

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
            <span>{analysis?.rating?.comment}</span>
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
            <ul>
              {analysis?.genre.slice(0, 3).map((v, i) => (
                <li key={i}>
                  <div className="title">{Object.keys(v)}</div>
                  <div className="sub">{v[Object.keys(v)]}권</div>
                </li>
              ))}
            </ul>
          </Section>

          <div
            className="twitter"
            onClick={(e) => {
              shareTwitter(
                `${member.nickname} 님의 취향 분석 결과는? ${analysis?.rating?.comment}`,
                window.location.href
              );
            }}
          >
            <FaTwitter />
            공유
          </div>
        </>
      )}
    </AnalysisContainer>
  );
};

export default Analysis;
