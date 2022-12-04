import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { Image } from "cloudinary-react";




const Gallery = () => {
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "tdphsco0");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dhcrarc6f/image/upload",
      formData
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <Wrapper >
      <div>
        <input
          type="file"
          onChange={(e) => {
            setImageSelected(e.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload Image</button>
        <Image
          style={{ width: 400 }}
          cloudName="dhcrarc6f"
          publicId="xeymggj5pdaol6pbrats"
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: grey solid 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75vw;
  height: 70vh;
  div {
    border: black solid 2px;
  }
  button {
    width: 100px;
    height: 25px;
  }
`;

export default Gallery;
