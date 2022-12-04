import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import SecretMap from "../smooth-scroll/SecretMap";
import h67sunrise from "../assets/h67sunrise.jpg";

const SecretSpot = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <Wrapper
          id="secret-spot"
          style={{ backgroundImage: `url(${h67sunrise})` }}
        >
          <Button
            onClick={() => loginWithRedirect("http://localhost:3000/homepage")}
          >
            <p>Log in to manage your spots</p>
          </Button>
        </Wrapper>
      )}
      {isAuthenticated && (
        <>
          <SecretMap />
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: grid;
  place-items: center;
  height: 100vh;
  opacity: 0.7;
`;

const Button = styled.button`
  border: none;

  border-radius: 2px;
  -webkit-box-shadow: 0px 0px 30px #6e99cd;
  -moz-box-shadow: 0px 0px 30px #6e99cd;
  box-shadow: 0px 0px 30px #6e99cd;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  background: #2c3d52;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  :hover {
    background: #b7c2d9;
    text-decoration: none;
    transform: scale(1.1);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    transition: ease-in 0.9s;
    transition: ease-out 0.3s;
    transition: 0.5s all ease-in-out;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    font-weight: 600;
  }
  p:hover {
    transition: ease-in 0.9s;
    transition: ease-out 0.3s;
    transform: scale(1.1);
    color: #243344;
    font-weight: 600;
  }
`;

export default SecretSpot;
