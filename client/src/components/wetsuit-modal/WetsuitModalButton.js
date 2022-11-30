import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import styled from "styled-components";
import WetsuitDisplay from "./WetsuitDisplay";

const WetsuitModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Wrapper>
        <div onClick={() => setIsOpen(true)}>Wetsuit Guide</div>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <WetsuitDisplay />
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
export default WetsuitModalButton;
