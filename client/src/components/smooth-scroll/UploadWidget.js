import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dhcrarc6f",
        uploadPreset: "tdphsco0",
      },
      function (error, result) {
        console.log(result);
      }
    );
  }, []);

  const { loginWithPopup, isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <Button onClick={() => loginWithPopup()}>
          Log In to Upload Image
        </Button>
      )}
      {isAuthenticated && (
        <>
          <Button onClick={() => widgetRef.current.open()}>Upload Image</Button>
        </>
      )}
    </>
  );
};
const Button = styled.button`
  border: none;
  color: whitesmoke;
  background-color: #2c3d52;
  padding: 6px 15px;
  font-size: 18px;
  border-radius: 4px;

  &:hover {
    transform: scale(1.2);
    transition: ease-in-out(0.3);
  }
`;
export default UploadWidget;
