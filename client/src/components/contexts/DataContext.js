import * as React from "react";
import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [wetsuits, setWetsuits] = useState(null);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // Gets all WETSUITS from database ///////////////////////////////////
    fetch("/wetsuits")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setWetsuits(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // Gets all SPOTS from database ///////////////////////////////////
    fetch("/getAllSpots")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setSpots(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <DataContext.Provider value={{ wetsuits, spots }}>
      {children}
    </DataContext.Provider>
  );
};
