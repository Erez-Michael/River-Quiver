// packages
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatISO } from "date-fns";

// components
import Header from "./Header";
import { FaWater } from "react-icons/fa";
import { TbTemperature } from "react-icons/tb";
import { GrTime } from "react-icons/gr";
import WetsuitModalButton from "./wetsuit-modal/WetsuitModalButton";
import { useParams } from "react-router-dom";

import { spots } from "./smooth-scroll/Map.js";

const Spot = () => {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeSeries, setTimeSeries] = useState(null);
  const [temp, setTemp] = useState(null);
  const { spot_id } = useParams();
  const spot = spots.find((each) => {
    return each.id === spot_id;
  });

  useEffect(() => {
    let toDate = formatISO(currentTime).split("-");
    toDate.pop();
    toDate = toDate.join("-");

    const startTime = new Date(currentTime - 1 * 60000);
    let fromDate = formatISO(startTime).split("-");
    fromDate.pop();
    fromDate = fromDate.join("-");

    console.log({ toDate, fromDate });
    // Habitat 67 Water levels in real time ////////////////////////////
    fetch(
      `https://api-iwls.dfo-mpo.gc.ca/api/v1/stations/${spot.id}/data?time-series-code=wlo&from=${fromDate}Z&to=${toDate}Z`
    )
      .then((res) => res.json())
      .then((parsedRes) => setTimeSeries(parsedRes));

    // Water temperature in real time //////////////////////////////////
    fetch(
      `https://api-iwls.dfo-mpo.gc.ca/api/v1/stations/${spot.id}/data?time-series-code=wt1&from=${fromDate}Z&to=${toDate}Z`
    )
      .then((res) => res.json())
      .then((parsedRes) => setTemp(parsedRes));

    // Vague à Guy Water levels in real time ///////////////////////////
    fetch(
      `https://api-iwls.dfo-mpo.gc.ca/api/v1/stations/${spot.id}/data?time-series-code=wlo&from=${fromDate}Z&to=${toDate}Z`
    )
      .then((res) => res.json())
      .then((parsedRes) => setTimeSeries(parsedRes));
  }, [currentTime]);

  // update time every 1 minute /////////////////////////
  useEffect(() => {
    const intervalTimeUpdate = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(intervalTimeUpdate);
  }, []);

  return (
    <>
      <Header />
      <Navigation>
        <div onClick={(e) => {
          e.preventDefault();
          navigate("/homepage");
        }}>Home</div>
        <div>Spots</div>
          <Modal>
            <WetsuitModalButton />
          </Modal>
      </Navigation>
      <Title>{spot.name}</Title>
      <Container>
        <Level>
          Level
          <FaWater size={100} />
          {timeSeries &&
            timeSeries.map((minute) => {
              return <p>{minute.value} m</p>;
            })}
        </Level>
        <Flow>
          Flow
          <GrTime size={100} />
          <p>7560 m³/s</p>
        </Flow>
        <Temperature>
          Temperature
          <TbTemperature size={100} />
          {temp &&
            temp.map((minute) => {
              return <p>{minute.value}°c</p>;
            })}
        </Temperature>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 600;
`;
const Title = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 30px;
  font-weight: 600;
`;

const Navigation = styled.div`
margin-top: 240px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 100%;
  overflow-x: hidden;
  background-color: #2c3d52;
  padding: 12px;
  text-align: center;
  position: sticky;
  top: 0px;
  z-index: 900;
  div {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    color: whitesmoke;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
  }
    
`;
const Level = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0px 100px;

  p {
    margin-top: 10px;
    font-size: 28px;
    
  }
`;

const Flow = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0px 100px;

  p {
    margin-top: 10px;
    font-size: 28px;
  }
`;

const Temperature = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0px 100px;

  p {
    margin-top: 10px;
    font-size: 28px;
    text-align: center;
  }
`;

const Modal = styled.div`
`;

export default Spot;
