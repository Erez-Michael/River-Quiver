import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Button onClick={() => logout()}>Sign Out</Button>
    )
  );
};

const Button = styled.button`
  border: none;
  background-color: #2c3d52;
  color: whitesmoke;
  cursor: pointer;
  font-size: 16px;
`;

export default Auth0LogoutButton;
