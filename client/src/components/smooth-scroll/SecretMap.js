import * as React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

// GOOGLE MAPS IMPORTS//////////////////////////
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
const SecretMap = () => {
  const { isAuthenticated } = useAuth0();
  const [selected, setSelected] = useState(null);
  const [pins, setPins] = useState([]);
  const { user } = useAuth0();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const onClickMap = (e) => {
    //console.log(e.eb.y); // gives y position, e.eb.x gives x position
    axios
      .post("/createPins", {
        email: user.email,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      })
      .then((response) => {
        setPins((current) => [...current, response.data.data]);
      })
      .catch((error) => window.alert(error));
  };

  // Fetch TO ENDPOINT: "/getPins" ///////////////////////////////////////////////
  useEffect(() => {
    axios
      .get("/getPins", { params: { email: user.email } })
      .then((response) => {
        console.log("data >>>>>", response); // neat trick to clearly see a log in the console " >>>>>>>>>>>>>>>>"
        setPins(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.email]);

  const mapRef = useRef();
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
        compass
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
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 20 * 100,
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
  ///////////////////////////////////////////////////////////////////

  // DELETE PIN ////////////////////////////////////////
  const onPinDelete = () => {
    axios.delete(`/deletePin/${selected._id}`).then(() => {
      setPins((state) => {
        return state.filter((item) => item._id !== selected._id);
      });
      setSelected(null);
    });
  };

  // Open Comment modal ////////////////////////////////////////

 

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <>
      {isAuthenticated && (
        <Container id="secret-map">
          <Header>
            <Title>
              <p>My Secret Spots{setPins} </p>
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
              id="map"
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              options={options}
              onClick={onClickMap}
              onLoad={onMapLoad}
            >
              {pins.map((pin, index) => (
                <Marker
                  onClick={() => setSelected(pin)}
                  key={index}
                  position={{
                    lat: Number(pin.lat),
                    lng: Number(pin.lng),
                  }}
                  icon={{
                    url: "https://res.cloudinary.com/dhcrarc6f/image/upload/v1669999840/55-551239_waves-waves-svg-free-hd-png-download_ttrowa.png",
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              ))}
              {selected ? (
                <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div>
                    <h2>
                      lat: {selected.lat}
                      lng: {selected.lng}
                      <Button onClick={onPinDelete}>Delete</Button>
                      <ButtonTwo>Comments</ButtonTwo>
                    </h2>
                  </div>
                </InfoWindow>
              ) : null}
            </GoogleMap>
          </Wrapper>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  padding-bottom: 20px;
  background-color: #e2e5ed;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 80px;
  width: 70vw;
`;
const Title = styled.div`
  display: flex;

  p {
    font-size: 30px;
    font-weight: 600;
  }
`;
const SpotSearch = styled.div`
  display: flex;
`;
const Locator = styled.div`
  display: flex;
`;
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
  const ButtonTwo = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: whitesmoke;
    background-color: grey;
  }
`;

export default SecretMap;
