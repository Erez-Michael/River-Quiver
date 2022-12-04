import ReactDOM from "react-dom/client";
import * as React from "react";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { DataProvider } from "./components/contexts/DataContext";

// AUTH0 keys /////////////////////////////////////
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
console.log(domain, clientId);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={"http://localhost:3000/homepage"}
  >
    <DataProvider>
      <App />
    </DataProvider>
  </Auth0Provider>,
);
