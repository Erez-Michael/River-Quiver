import React from "react";
import Modal from "../wetsuit-modal/Modal";
import { useState } from "react";
import styled from "styled-components";
import Table from "./Table";

const TableModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Wrapper>
        <div onClick={() => setIsOpen(true)}>Comments</div>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Table />
        </Modal>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  div {
    background-color: #2c3d52;
    color: whitesmoke;
    border: none;
    color: whitesmoke;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
  }
`;
export default TableModalButton;
