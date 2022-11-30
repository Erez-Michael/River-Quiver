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
            duration={1000}
          >
            HOME
          </Link>
          <Link
            activeClass="active"
            to="map"
            spy={true}
            smooth={true}
            duration={1000}
          >
            DATA MAP
          </Link>
          <Link
            activeClass="active"
            to="gallery"
            spy={true}
            smooth={true}
            duration={1000}
          >
            GALLERY
          </Link>
          {!isAuthenticated && (
            <Link
              activeClass="active"
              to="secret-spot"
              spy={true}
              smooth={true}
              duration={1000}
            >
              SECRET SPOT
            </Link>
          )}
          {isAuthenticated && (
            <Link
              activeClass="active"
              to="secret-map"
              spy={true}
              smooth={true}
              duration={1000}
            >
              SECRET SPOT
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
    color: whitesmoke;
    * {
      cursor: pointer;
    }
    .active {
      transform: scale(1.4);
      transition: ease-in 0.3s;
      transition: ease-out 0.3s;
      color: #c2c4cb;
    }
  }
`;

const Wrapper = styled.div``;
export default NavBar;
