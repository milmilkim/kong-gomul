import styled from "styled-components";
import ProfileImage from "../ProfileImage";

const StyledProfile = styled.div`
  section.con1 {
    justify-content: center;
    align-items: center;
    text-align: left;
    margin-bottom: 40px;

    h2 {
      font-weight: bold;
      padding: 5px 0;
    }

    p {
      font-size: 12px;
      padding: 5px 0;
    }

    .icon-container {
      margin-right: 20px;
      img {
        width: 80px;
      }
    }

    .edit-btn {
      width: 25px;
      height: 25px;
    }
  }
`;

const Profile = ({ data }) => {
  return (
    <StyledProfile>
      <section className="con1 flex-row">
        <div className="icon-container">
          <ProfileImage src={data.profile_image} alt={data.nickname} />
        </div>
        <div>
          <h2>{data?.nickname}</h2>
          <p>{data?.introduce}</p>
        </div>
      </section>
    </StyledProfile>
  );
};

export default Profile;
