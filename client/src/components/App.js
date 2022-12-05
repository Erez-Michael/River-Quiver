import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import * as React from "react";
import GlobalStyles from "./GlobalStyles";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import Spot from "./Spot";

import { Auth0Provider } from "@auth0/auth0-react";
import { DataProvider } from "../components/contexts/DataContext";

// AUTH0 keys /////////////////////////////////////
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// Tab custom title //////////////////////////////
const App = () => {
  useEffect(() => {
    document.title = "River Quiver | Go With The Flow";
  }, []);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={"http://localhost:3000/homepage"}
    >
      <DataProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/spot/:spot_id" element={<Spot />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </Auth0Provider>
  );
};

export default App;
