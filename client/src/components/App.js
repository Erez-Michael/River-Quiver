import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import GlobalStyles from "./GlobalStyles";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import Spot from "./Spot";

const App = () => {
  

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/spot/:spot_id" element={<Spot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
