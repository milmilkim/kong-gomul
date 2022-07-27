import React, { memo, useState } from "react";
import axios from "../config/axios";
import { setProfileImg } from "../slices/AuthSlice";
import { useDispatch } from "react-redux";
const Test = memo(() => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img", image);
      const res = await axios.post("api/image/upload", formData);
      alert("업로드 성공!");
      setImageUrl(res.data);
      dispatch(setProfileImg(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>테스트를 위한 페이지</h1>

      <form onSubmit={onSubmit}>
        {imageUrl ? (
          <>
            <img src={imageUrl} alt="" width={50} />
          </>
        ) : (
          ""
        )}
        <input type="file" onChange={onChange} />
        <button type="submit">업로드</button>
      </form>
    </div>
  );
});

export default Test;
