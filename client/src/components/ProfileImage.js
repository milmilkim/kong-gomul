import defaultImg from "../assets/img/default.jpg";

const ProfileImage = ({ src, alt }) => {
  return <img src={src || defaultImg} alt={alt} />;
};

export default ProfileImage;
