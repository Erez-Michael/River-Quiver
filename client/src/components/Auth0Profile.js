import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0Profile = () => {
  const { user, isAuthenticated } = useAuth0();
console.log(user);
  return (
    isAuthenticated &&
    user && (
      <>
        <Article>
          <UserName>{user.name}, surf's up!</UserName>

          {user.picture && <Image src={user.picture} alt={user.name}/>}

          {/*<ul>
            {Object.keys(user).map((objKey, i) => {
              return (
                <li key={i}>
                  {objKey}: {user[objKey]}
                </li>
              );
              
            })}
          </ul>*/}
        </Article>
      </>
    )
  );
};

const Article = styled.div`
display: flex;
flex-direction: row;
font-size:16px;
align-items:center;
`;

const UserName = styled.div`
  color: whitesmoke;
  font-size: 16px;
  padding: 0px 20px;
  cursor: context-menu;
`;
 
const Image = styled.img`
  border-radius: 1px;
  width: 50px;
  cursor: pointer;
`;


export default Auth0Profile;
