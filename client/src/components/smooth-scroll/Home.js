import * as React from "react";
import styled from "styled-components";
import guySun from "../assets/guySun.jpg";
import { FiDroplet } from "react-icons/fi";

const Home = () => {
  return (
    <Container id="home" style={{ backgroundImage: `url(${guySun})` }}>
      <Wrapper>
        <Text>
          <div>
            <FiDroplet size={30} color={"#2C3D52"} fill={"#5C6367"} />
            <p>Global River Surf Spot Databse</p>
          </div>
          <div>
            <FiDroplet size={30} color={"#2C3D52"} fill={"#5C6367"} />
            <p>Real-Time Hydrometric Data</p>
          </div>
          <div>
            <FiDroplet size={30} color={"#2C3D52"} fill={"#5C6367"} />
            <p>Interactive Maps</p>
          </div>
        </Text>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: grid;
  place-items: center;
  height: 100vh;
  animation: fadeInAnimation ease 6s;
  animation-iteration-count: 1;
  animation-fill-mode: backwards;
  z-index: -1;

  @keyframes fadeInAnimation {
    0% {
      opacity: 0.1;
    }

    100% {
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 250px;
  margin-bottom: 100px;
`;

const Text = styled.div`
  margin-top: 100px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 900;
  div {
    display: flex;
    flex-direction: row;
    padding: 30px;
  }
  p {
    font-size: 35px;
    font-weight: 600;
    margin-left: 20px;
  }
`;
export default Home;
