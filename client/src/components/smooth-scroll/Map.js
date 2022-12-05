import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useContext, useRef, useCallback } from "react";
import { DataContext } from "../contexts/DataContext";

// GOOGLE MAPS IMPORTS >>>>>>>>>>>>>>>>>>>>>>>>>>>
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import googleMapStyles from "../googleMapStyles";
// GOOGLE MAPS IMPORTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const libraries = ["places"];

const options = {
  styles: googleMapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const containerStyle = {
  width: "70vw",
  height: "50vh",
};

const center = {
  lat: 45.508888,
  lng: -73.561668,
};

/// Function START /////////////////////////////////////////////////
const Map = () => {
  const { spots } = useContext(DataContext);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  const mapRef = useRef();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const onSelect = (item) => {
    setSelected(item);
  };

  const handleClick = (e, spot_id) => {
    e.preventDefault();
    navigate(`/spot/${spot_id}`);
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  }, []);

  // COMPASS BUTTON - re-centers position  ////////////////////////
  const Locate = ({ panTo }) => {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        Compass
      </button>
    );
  };

  //// SEARCH BAR AUTOFILL ///////////////////////////////////////////
  const Search = ({ panTo }) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 45.508888, lng: () => -73.561668 },
        radius: 100 * 1000,
      },
    });

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    return (
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Find my spot"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Container id="map">
        <Header>
          <Title>
            <p>DATA MAP</p>
          </Title>
          <SpotSearch>
            <Search panTo={panTo} />
          </SpotSearch>
          <Locator>
            <Locate panTo={panTo} />
          </Locator>
        </Header>
        <Wrapper>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={options}
            onLoad={onMapLoad}
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
                  <img src={`assets/${selected.image}.jpg`} alt="Surf-spot" />

                  <Button
                    onClick={(ev) => {
                      handleClick(ev, selected.id);
                    }}
                    selected={selected}
                  >
                    More Info
                  </Button>
                </Container>
              </InfoWindow>
            )}
          </GoogleMap>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #e2e5ed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  p {
    font-size: 30px;
  }
  img {
    width: 220px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
  width: 70vw;
`;
const Title = styled.div`
  display: flex;
  p {
    font-size: 30px;
    font-weight: 600;
    color: #2c3d52;
  }
`;
const SpotSearch = styled.div``;
const Locator = styled.div``;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
