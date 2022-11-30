import * as React from "react";
import styled from "styled-components";

const Gallery = () => {
  return (
    <Wrapper id="gallery">
      <div>GALLERY</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 75vw;
    height: 65vh;
    border: black solid 2px;
  }
`;
 
export default Gallery;

