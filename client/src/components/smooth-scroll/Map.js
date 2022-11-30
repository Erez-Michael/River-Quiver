import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import neo from "../../assets/neo.jpg";
import h67 from "../../assets/h67.jpg";

// GOOGLE MAPS IMPORTS//////////////////////////
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import googleMapStyles from "../googleMapStyles";
//  GOOGLE MAPS IMPORTS//////////////////////////

export const spots = [
  {
    id: "5cebf1e03d0f4a073c4bbdd7",
    code: "15520",
    name: "Habitat 67",
    image: h67,
    location: {
      lat: 45.501305,
      lng: -73.542253,
    },
  },
  {
    id: "5cebf1de3d0f4a073c4bb94a",
    code: "07755",
    name: "Vague à Guy",
    image: neo,
    location: {
      lat: 45.41941929741901,
      lng: -73.60276712888145,
    },
  },
];

const Map = () => {
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const options = {
    styles: googleMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const containerStyle = {
    width: "75vw",
    height: "65vh",
  };

  const center = {
    lat: 45.508888,
    lng: -73.561668,
  };

  const onSelect = (item) => {
    setSelected(item);
  };

  const handleClick = (e, spot_id) => {
    e.preventDefault();
    navigate(`/spot/${spot_id}`);
  };

  ////////////////////////////////////////////////////////
  //////////////////////////////////////////////////

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Wrapper id="map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={options}
        >
          {spots.map((item) => {
            return (
              <Marker
                key={item.name}
                position={item.location}
                onClick={() => {
                  onSelect(item);
                }}
              />
            );
          })}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <Container>
                <p>{selected.name}</p>
                <img src={selected.image} alt="Surf-spot" />

                <Button
                  onClick={(ev) => {
                    handleClick(ev, selected.id);
                  }}
                >
                  More Info
                </Button>
              </Container>
            </InfoWindow>
          )}
        </GoogleMap>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
background-color: #e2e5ed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 30px;
  }
  img {
    width: 300px;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: whitesmoke;
    background-color: grey;
  }
`;

export default Map;
