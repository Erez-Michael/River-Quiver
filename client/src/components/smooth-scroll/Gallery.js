import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { SpinnerDotted } from "spinners-react";
import UploadWidget from "./UploadWidget";

const Gallery = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    // Gets all IMAGES from CLOUDINARY FOLDER ////////
    fetch("/getAllImages")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setImage(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
// Loading state ////////////////////////////////////
  if (!image) {
    return (
      <Spinner>
        <SpinnerDotted
          size={90}
          thickness={87}
          speed={159}
          color="rgba(44, 61, 82, 1)"
        />
      </Spinner>
    );
  } else {
    return (
      <Container id="gallery">
        <Widget>
          <UploadWidget />
        </Widget>
        <Images>
          {image.map((image) => {
            return <img src={image.url} alt="" />;
          })}
        </Images>
      </Container>
    );
  }
};

const Spinner = styled.span`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 450px);
`;

const Container = styled.div`
  background-color: #e2e5ed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Images = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(4, 170px);
  grid-template-rows: repeat(4, 170px);

  img {
    width: 160px;
    height: 140px;
  }
  img:hover {
    transform: scale(1.2);
    transition: ease-in-out(0.3);
  }
`;

const Widget = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
export default Gallery;
