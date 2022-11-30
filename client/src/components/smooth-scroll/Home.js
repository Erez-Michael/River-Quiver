import * as React from "react";
import styled from "styled-components";
import coldSurf from "../../assets/coldSurf.jpg"

const Home = () => {
  return (
    <Container id="home">
    <Wrapper>
        <Image src={coldSurf} />
      <Text></Text>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 75vw;
  height: 65vh;
  margin-top: 300px;
`;
const Image = styled.img`
width: 350px;
`;
const Text = styled.div`
`;
export default Home;
