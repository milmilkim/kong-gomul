import { Link } from "react-router-dom";

//이미지들
import love from "../../assets/img/love.png";
import books from "../../assets/img/books.png";

import { FaChartBar } from "react-icons/fa";

import styled from "styled-components";

import { useSelector } from "react-redux";

const SteyldIcons = styled.div`
  .con2 {
    padding: 20px 0;

    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    svg {
      vertical-align: middle;
      margin-right: 2px;
    }

    .analysis {
      font-weight: bold;
      line-height: 1;
    }

    .flex-row {
      justify-content: space-evenly;
      align-items: center;
      padding: 20px 0;
      margin: auto;
      width: 100%;
    }

    img {
      width: 80px;
      margin: 10px 0;
    }
  }
`;

const LibraryIcons = ({ member_id }) => {
  const { info } = useSelector((state) => state.auth);

  return (
    <SteyldIcons>
      <section className="con2">
        <p className="analysis">
          <Link to={member_id ? `/member/${member_id}/analysis` : `/member/${info?.id}/analysis`}>
            <FaChartBar />
            취향분석
          </Link>
        </p>

        <div className="flex-row">
          <div>
            <Link to={member_id ? `/member/${member_id}/wishes` : `/library/wishes`}>
              <img src={love} alt="보고싶어요" />
              <p>보고싶어요</p>
            </Link>
          </div>
          <Link to={member_id ? `/member/${member_id}/library` : `/library`}>
            <img src={books} alt="서재" />
            <p>서재</p>
          </Link>
        </div>
      </section>
    </SteyldIcons>
  );
};

export default LibraryIcons;
