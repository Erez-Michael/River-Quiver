import * as React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-scroll";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <StyledContainer>
        <div className="header">
          <Link
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            duration={800}
          >
            <p> HOME</p>
          </Link>
          <Link
            offset={-285}
            activeClass="active"
            to="map"
            spy={true}
            smooth={true}
            duration={800}
          >
            <p> DATA MAP</p>
          </Link>
          <Link
            offset={-288}
            to="gallery"
            spy={true}
            smooth={true}
            duration={800}
          >
            <p> GALLERY</p>
          </Link>
          {!isAuthenticated && (
            <Link
              activeClass="active"
              to="secret-spot"
              spy={true}
              smooth={true}
              duration={800}
            >
              <p> SECRET SPOT</p>
            </Link>
          )}
          {isAuthenticated && (
            <Link
              activeClass="active"
              to="secret-map"
              spy={true}
              smooth={true}
              duration={800}
            >
              <p>SECRET SPOT</p>
            </Link>
          )}
        </div>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  font-size: 16px;
  font-weight: 400;
  
  & p {
    &:hover {
      transform: scale(1.3);
      color: #79a0cf;
    }
  }
  /*.active {
    color: #79a0cf;
    transform: scale(1.3);
  }*/
  .header {
    background-color: #2c3d52;
    padding: 12px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    position: fixed;
    top: 27%;
    width: 100%;
    z-index: 900;
    color: white;
    * {
      cursor: pointer;
    }
  }
`;

const Wrapper = styled.div``;
export default NavBar;
