import ReactDOM from "react-dom";
import * as React from "react";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { DataProvider } from "./components/contexts/WetsuitsContext";


// AUTH0 keys /////////////////////////////////////
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
console.log(domain, clientId);

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={"http://localhost:3000/homepage"}
  >
    <DataProvider>
      <App />
    </DataProvider>
  </Auth0Provider>,
    document.getElementById("root")

);
