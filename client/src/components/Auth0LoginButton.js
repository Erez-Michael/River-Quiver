import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button
        onClick={() => loginWithRedirect("http://localhost:3000/homepage")}
      >
        Sign In
      </Button>
    )
  );
};

const Button = styled.button`
  border: none;
  background-color: #2c3d52;
  color: whitesmoke;
  cursor: pointer;
  padding: 20px 0px 10px 23px;
  font-size: 18px;
`;

export default Auth0LoginButton;




