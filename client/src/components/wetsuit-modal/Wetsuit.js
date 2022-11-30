import React from "react";
import styled from "styled-components";

const Wetsuit = ({ item, one, index }) => {
    //console.log(item);
    return ( 
        <>
            {one[index] &&
                <Wrapper>
                <img src={item.imageSrc} width="220px" />
                <Thickness>{item.thickness}</Thickness>
        </Wrapper>
            }
        </>
     );
};
const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left: -80px;
margin-top: 100px;
  img {
    object-fit: contain;
    image-rendering: crisp-edges;
    image-resolution: from-image;
    image-resolution: 300dpi;
    image-resolution: from-image 300dpi;
    image-resolution: 300dpi snap;
    -webkit-filter: blur(0px);
    -moz-filter: blur(0px);
    -ms-filter: blur(0px);
    image-rendering: -webkit-optimize-contrast;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
  }
`;
const Thickness = styled.div`
font-size: 40px;
font-weight: 400;
text-align: center;
`;

export default Wetsuit;