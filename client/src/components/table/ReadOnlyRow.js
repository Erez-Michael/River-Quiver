import React from "react";
import styled from "styled-components";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <Container>

    <Wrapper>

      <p>{contact.level}</p>
      <p>{contact.flow}</p>
      <p>{contact.rating}</p>
      <p>{contact.equipment}</p>
        {/* TODO
        <button
        type="button"
        onClick={(event) => handleEditClick(event, contact)}
        >
        Edit
      </button>*/} 

        <p className="button"  onClick={() => handleDeleteClick(contact._id)}>
          Delete
        </p>
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
