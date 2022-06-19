import React from "react";

import styled from "styled-components";

const ProfileContainer = styled.div`
  padding: 0;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <div className="inner">
        <h2>여기에 닉네임</h2>
        <p>여기에 한마디</p>
      </div>
    </ProfileContainer>
  );
};

export default Profile;
