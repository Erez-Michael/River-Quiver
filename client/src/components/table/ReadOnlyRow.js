import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";


const ReadOnlyRow = ({ contact, handleDeleteClick }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <Container>
      <Wrapper>
        <p>{contact.level}</p>
        <p>{contact.flow}</p>
        <p>{contact.rating}</p>
        <p>{contact.equipment}</p>
        {!isAuthenticated && (
          <p
            className="button"
            style={{filter: "opacity(0.4)"} }
            onClick={() => loginWithRedirect("http://localhost:3000/homepage")}
          >
            Sign In !
          </p>
        )}

        {isAuthenticated && (
          <p className="button" onClick={() => handleDeleteClick(contact._id)}>
            Delete
          </p>
        )}
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  max-height: 60%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  div {
    display: flex;
    justify-content: space-between;
  }
  p {
    width: 70vw;
    text-align: left;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .button {
    width: 50vw;
    text-align: center;
    border: #2c3d52 solid 1px;
    color: #2c3d52;
    background-color: whitesmoke;
    padding: 1px 10px;
    font-size: 18px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 1.5vw;
  }
`;
export default ReadOnlyRow;
