import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./Auth0LoginButton";
import LogoutButton from "./Auth0LogoutButton";
import Profile from "./Auth0Profile";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading, error } = useAuth0;

  return (
    <Container>
      <TopHeader>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
            <LogoutButton />
            <Profile />
          </>
        )}
      </TopHeader>

      <Title>
        <LogoWrap
          onClick={(ev) => {
            ev.preventDefault();
            navigate("/homepage");
          }}
        >
          <div>
            <h2>River Quiver</h2>
            <h2>River Quiver</h2>
          </div>
        </LogoWrap>
        <span>Go with the flow</span>
      </Title>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 900;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #2c3d52;
  color: whitesmoke;
  padding: 8px 25px;
  font-size: 12px;
`;

const Title = styled.button`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: #e2e5ed;
  color: #2c3d52;
  padding-bottom: 10px;
  span {
    margin-bottom: 40px;
    font-style: italic;
    font-size: 18px;
    margin-top: -150px;
    font-weight: 600;
    color: #2c3d52;
  }
`;

const LogoWrap = styled.div`
  div:hover {
    cursor: pointer;
  }

  div h2 {
    font-size: 50px;
  }

  div h2:nth-child(1) {
    color: #79a0cf;
    -webkit-text-stroke: 1px #364853;
  }
  div h2:nth-child(2) {
    color: #364853;
    transform: translate(0px, -117px);
    animation: animate 2s ease-in-out infinite;
  }
  @keyframes animate {
    0%,
    100% {
      clip-path: polygon(
        0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%
      );
    }

    50% {
      clip-path: polygon(
        0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%
      );
    }
  }
`;

export default Header;
