import { useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import styled from "styled-components";

import { SpinnerDotted } from "spinners-react";

import Wetsuit from "./Wetsuit";

const WetsuitDisplay = () => {
  const { wetsuits } = useContext(DataContext);
  const [one, setOne] = useState([]);
  const [surf, setSurf] = useState(false);

  if (!wetsuits) {
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
      <>
        <Wrapper>
          <Container>
            <WetsuitSlider>
              <div
                onClick={() => {
                  setOne([true, false, false, false, false, false]);
                  setSurf(!surf);
                }}
              ></div>
              <div
                onClick={() => {
                  setOne([false, true, false, false, false, false]);
                  setSurf(!surf);
                }}
              ></div>
              <div
                onClick={() => {
                  setOne([false, false, true, false, false, false]);
                  setSurf(!surf);
                }}
              ></div>
              <div
                onClick={() => {
                  setOne([false, false, false, true, false, false]);
                  setSurf(!surf);
                }}
              ></div>
              <div
                onClick={() => {
                  setOne([false, false, false, false, true, false]);
                  setSurf(!surf);
                }}
              ></div>
              <div
                onClick={() => {
                  setOne([false, false, false, false, false, true]);
                  setSurf(!surf);
                }}
              ></div>
            </WetsuitSlider>
            <Temperature>
              <p>30°c</p>
              <p>20°c</p>
              <p>15°c</p>
              <p>12°c</p>
              <p>8°c</p>
              <p>0°c</p>
            </Temperature>
          </Container>
          <Instructions>
            <p>Click on temperature scale to generate wetsuit</p>
          </Instructions>
          <Wetsuits>
            {wetsuits.map((item, index) => {
              return (
                <Wetsuit key={item._id} item={item} one={one} index={index} />
              );
            })}
          </Wetsuits>
        </Wrapper>
      </>
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

const Wrapper = styled.div`
  border: #e2e5ed solid 2px;
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 60vw;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    0px 18px 24px 10px rgba(54, 72, 83, 0.59);
  box-shadow: 0px 10px 13px -7px #000000,
    0px 18px 24px 10px rgba(54, 72, 83, 0.59);
  z-index: 900;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  margin-left: -50px;
`;
const WetsuitSlider = styled.div`
  border: wheat solid 1px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100px;
  height: 40vh;
  font-size: 50px;
  background: linear-gradient(
    360deg,
    rgba(78, 120, 209, 1) 9%,
    rgba(253, 179, 29, 1) 50%,
    rgba(223, 25, 59, 1) 100%
  );

  div {
    cursor: pointer;
    border: grey solid 5px;
    border-radius: 2px;
    width: 90px;
    height: 80px;
    transition: ease-in 0.6s;
    transition: ease-out 0.5s;
    opacity: 0.7;
  }
  div:hover {
    transform: scale(1.1);
  }
`;
const Temperature = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 20px;
  font-weight: 600;
`;
const Wetsuits = styled.div`
  width: 100px;
  margin-left: -400px;
`;

const Instructions = styled.div`
  margin-top: 10px;
  margin-left: -430px;
  p {
    font-size: 20px;
    font-weight: 600;
  }
`;

export default WetsuitDisplay;
