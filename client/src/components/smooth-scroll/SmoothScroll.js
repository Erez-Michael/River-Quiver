import React from 'react';
import styled from 'styled-components';
import { animateScroll as scroll } from "react-scroll";


const SmoothScroll = () => {

 const scrollToTop=()=> {
     scroll.scrollToTop();
 }
 
 function scrollToBottom() {
   scroll.scrollToBottom();
 }
 


    return (
      <SmoothStyled>
        <div className="bottom button-row">
          <div>
            <button onClick={scrollToBottom}>Scroll to Bottom</button>
          </div>
        </div>
        <div className="top button-row">
          <div>
            <button onClick={scrollToTop}>Scroll to Top</button>
          </div>
        </div>
      </SmoothStyled>
    );
}
 const SmoothStyled = styled.div`
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   .button-row {
     width: 100vw;
     display: flex;
     justify-content: space-between;
     div {
       margin: 0 10px;
     }
     button {
       padding: 3px;
       font-weight: bold;
       cursor: pointer;
     }
   }
   .bottom {
     margin-bottom: 115px;
   }
 `;
export default SmoothScroll;