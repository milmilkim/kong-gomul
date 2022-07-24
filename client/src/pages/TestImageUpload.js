import React, { memo, useState } from "react";
import axios from "../config/axios";

const Test = memo(() => {
  const BASE_URL = "http://localhost:3000";
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState({
    fileName: "",
    filePath: "",
  });

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", image);
    axios
      .post("http://localhost:3001/api/image/upload", formData)
      .then((res) => {
        const { fileName } = res.data;
        setUploadedImage({ fileName, filePath: `${BASE_URL}/img/${fileName}` });
        console.log("업로드 성공!");
        alert("업로드 성공!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>테스트를 위한 페이지</h1>

      <form onSubmit={onSubmit}>
        {uploadedImage ? (
          <>
            <img src={uploadedImage.filePath} alt="" />
            <h3>{uploadedImage.fileName}</h3>
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
