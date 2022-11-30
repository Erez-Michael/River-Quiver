import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import videoBg from "../assets/videoBg.mp4";

const LandingPage = () => {
  const navigate = useNavigate();

  // TODO: Sign in / Sign Up

  return (
    <Container>
      <Video>
        <video src={videoBg} autoPlay loop muted />
      </Video>
      <Flex>
        <div>
          <Title>River Quiver</Title>
        </div>
        <Button
          onClick={(ev) => {
            ev.preventDefault();
            navigate("/homepage");
          }}
        >
          <p>Enter</p>
        </Button>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Video = styled.div`
  width: 100%;
  height: 100vh;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;

  div {
    animation: fadeInAnimation ease 6s;
    animation-iteration-count: 1;
    animation-fill-mode: backwards;
  }
  @keyframes fadeInAnimation {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  color: whitesmoke;
  font-size: 70px;
  cursor: context-menu;
`;

const Button = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  position: absolute;
  top: 58%;
  width: fit-content;
  height: fit-content;
  font-size: 35px;
  color: whitesmoke;
  font-size: 25px;
  cursor: pointer;

  p {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    margin-left: 485px;
    border: white solid 1px;
    border-radius: 2px;
    padding: 0px 5px;
    animation-duration: 5s;
    animation-fill-mode: both;
    animation-name: slideInRight;
    display: flex;
  }
  @keyframes slideInRight {
    from {
      transform: translate3d(3500%, 0, 0);
      visibility: visible;
    }
  }

  p:hover {
    transform: scale(1.1);
  }
`;

export default LandingPage;
