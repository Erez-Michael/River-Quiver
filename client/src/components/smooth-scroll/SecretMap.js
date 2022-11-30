import * as React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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

/// Function START //////////////////////////////////////////////////////

const SecretMap = () => {
  const [pins, setPins] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  //console.log(pins);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const options = {
    styles: googleMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const containerStyle = {
    width: "70vw",
    height: "70vh",
  };

  const center = {
    lat: 45.508888,
    lng: -73.561668,
  };

  /// FETCH TO ENDPOINT: "/create-pins" /////////////////////////////////////////////

  const onClickMap = (e) => {
    console.log(e.eb.y);
    fetch("/create-pins", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.name,
        pins: { lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          throw new Error(data.message);
        } else {
        }
      })
      .catch((error) => window.alert(error));
  };

  // Fetch TO ENDPOINT: "/getPins" ///////////////////////////////////////////////
  useEffect(() => {
    fetch("/getPins")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setPins(data.data[0].pins);
          console.log(data.data[0].pins);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  {
    /*const [profile, setProfile] = useState();
  useEffect(() => {
    fetch("/create-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: profile }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          throw new Error(data.message);
        } else {
        }
      })
      .catch((error) => window.alert(error));
  }, []);*/
  }

  //    /////////////////////////////////////////////////////////////////

  const onMapClick = useCallback((e) => {
    setPins((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

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
    console.log(selected);
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
  
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  
  return (
    <>
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
        {pins
          ? pins.map((pin, index) => {
              return <div></div>;
            })
          : null}
      </Header>
      <Wrapper>
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
          onClick={(e) => {
            onClickMap(e);
            onMapClick(e);
          }}
          onLoad={onMapLoad}
        >
          {pins.map((pin, index) => (
            <Marker
              onClick={(e) => {
                setSelected(pin);
              }}
              key={index}
              position={{
                lat: Number(pin.lat),
                lng: Number(pin.lng),
              }}
              icon={{
                url: "https://www.kindpng.com/picc/m/55-551239_waves-waves-svg-free-hd-png-download.png",
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
                  TODO: COMMENTS SECTION (if not possible, navigate to modal**)
                </h2>
              </div>
            </InfoWindow>
          ) : null}
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
  p {
    font-size: 30px;
  }
  img {
    width: 300px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 80px;
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

export default SecretMap;
