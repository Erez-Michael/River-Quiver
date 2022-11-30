import React from "react";

import NavBar from "./smooth-scroll/NavBar";
import Home from "./smooth-scroll/Home";
import Map from "./smooth-scroll/Map";
import Gallery from "./smooth-scroll/Gallery";
import SecretSpot from "./smooth-scroll/SecretSpot";
import Header from "./Header";

const HomePage = () => {
  return (
    <div >
      <Header />
      <NavBar />
      <Home />
      <Map />
      <Gallery />
      <SecretSpot />
    </div>
  );
};

export default HomePage;
