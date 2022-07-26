import defaultImg from "../assets/img/default.jpg";

const ProfileImage = ({ src, alt }) => {
  return <img src={src || defaultImg} alt={alt} style={{ objectFit: "cover" }} />;
};

export default ProfileImage;
