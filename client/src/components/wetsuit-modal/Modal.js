import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <StyledModal>
        <button onClick={onClose}>X</button>
        {children}
      </StyledModal>
    </>,
    document.getElementById("portal")
  );
};

const StyledModal = styled.div`
  background-color: white;
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 80px;
  z-index: 900;
  border-radius: 3px;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: slideInRight;
  width: 70vw;
  height: 50vh;
  font-size: 100px;
  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }
  }

  button {
    font-size: 25px;
    position: absolute;
    z-index: 1;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    margin-left: -40px;
    margin-top: -30px;
  }

  @media screen and (min-width: 600px) {
    width: 50vw;
  }
  @media screen and (max-width: 1024px) {
    width: 70vw;
  }
`;
export default Modal;
